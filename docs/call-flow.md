# Call flow: how voice and video calls work (WebRTC)

This document explains how NOVA handles voice, video, and screen-sharing
calls. The key idea to grasp is the difference between **signaling** and
**media transport**.

## The core idea: peer-to-peer media with a signaling assist

Two phones/desktops want to share audio/video. There are two possible paths:

1. **Relay through a server**: both send media to the server, which forwards
   it. Simple but expensive and adds latency.
2. **Peer-to-peer (P2P)**: both send media directly to each other. Cheap and
   fast, but they need to "find" each other over the internet first.

NOVA uses **P2P** as the primary path, with the backend only helping the two
apps connect. That helper role is called **signaling**.

## The signaling step (the server's only role)

For two apps to connect directly, each must learn the other's connection
details (IP address, port, media capabilities). They exchange these via the
backend WebSocket — this is signaling:

```
App A                    Backend                   App B
  |                         |                         |
  |-- call:signal(offer) -->|                         |
  |                         |-- call:signal(offer) -->|
  |                         |                         |
  |<-- call:signal(answer)--|                         |
  |                         |<-- call:signal(answer)--|
  |                         |                         |
  |<========= direct media (P2P) ===================>|
```

The backend is only a **middleman for introductions**. Once the two apps have
exchanged the initial "offers and answers", they connect directly and the
backend is no longer in the media path.

## Why the server is not in the media path

- **Cost**: relaying video is expensive for the server.
- **Latency**: direct connections are faster, which matters for real-time
  voice and video.
- **Privacy**: media goes only between the two participants.

## The fallback: TURN (coturn)

Direct P2P doesn't always work. Some networks (corporate firewalls, strict
NATs, carrier-grade NAT) block direct connections. When the apps cannot reach
each other directly, they fall back to a **TURN server** — coturn — which
relays the media as a last resort.

This is handled automatically by WebRTC: NOVA provides coturn as a configured
TURN server, and WebRTC only uses it when direct connection fails.

## The three WebRTC pieces (worth learning)

| Piece | What it does |
|---|---|
| **STUN** | "What's my public address?" — helps a peer discover its own public IP/port. |
| **TURN** | "Relay my media for me" — used when direct connection is impossible. |
| **Signaling** | "Introduce the two peers" — the backend's role in NOVA. |

## Protocol events (in `packages/shared/ws-messages.ts`)

The WebSocket events for calls are deliberately small:

- `call:signal` — carries a WebRTC signal (offer/answer/ICE candidate) between
  the two apps, relayed by the backend.
