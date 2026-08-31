# Architecture

This document explains how the pieces of NOVA fit together. It is written
to be read by engineering students, so it explains the *why* as well as the
*what*.

## The big picture

NOVA is a **desktop messaging app for two people**. There are two sides to
every interaction:

```
+---------------------+        +---------------------+        +------------+
|  Desktop app        |        |  Backend (server)   |        |  Database  |
|  (Tauri + React)    | <----> |  (NestJS)           | <----> | (Postgres) |
|  what you see/type  |  HTTP  |  validation, auth,  |  SQL   | where data |
|                     |   +    |  storage, realtime  |        |   lives    |
+---------------------+  WS    +---------------------+        +------------+
```

**Key idea:** the desktop app *never* talks directly to the database. It talks
to the backend, and the backend talks to the database. This separation is
intentional and important for security (see below).

## The monorepo layout

NOVA is a **monorepo** — one repository containing several related projects
managed together with `pnpm` workspaces:

```
apps/desktop   -> the desktop app (React UI + minimal Rust shell)
apps/server    -> the backend API + realtime layer
packages/shared-> types shared by both sides
docs/          -> this documentation
```

**Why a monorepo?** Because the frontend and backend need to agree on what
data looks like. Instead of copying type definitions between two separate
repositories, both import them from `packages/shared`. One source of truth.

## How a message travels (the central flow)

The single most important flow to understand:

1. You type a message in the React UI (`apps/desktop/src/ui/Chat.tsx`).
2. The frontend sends it to the backend over a **WebSocket** connection.
   The shape of that message is defined in `packages/shared/ws-messages.ts`.
3. The backend (`apps/server`) **validates** the message — checks it is well
   formed and you are allowed to send it.
4. The backend **saves** it to PostgreSQL.
5. The backend **forwards** the message to the other participant's app over
   their WebSocket connection.
6. The other person sees it appear in real time.

### Why a WebSocket and not a plain HTTP request?

HTTP is "request → response": you ask, the server answers, done. For a chat,
we want the server to be able to *push* a message to you the moment it
arrives, without you asking. A **WebSocket** keeps a persistent two-way
connection open, so either side can send at any time. This is what makes
real-time chat feel instant.

## Security model (why the separation matters)

A core rule of NOVA (see `docs/`) is: **never trust the frontend.** Anyone
can modify the desktop app or send fake requests. So:

- The backend **validates everything** it receives.
- The backend **never exposes secrets** (database passwords, signing keys).
- Sensitive operations (auth, price/quantity recalculation) happen only on
  the backend, against the database as the source of truth.

The separation in the diagram above is what makes this possible: the client
only ever sees the backend's public API, never the database directly.

## Calls (WebRTC)

For voice, video, and screen-sharing calls, NOVA uses **WebRTC** — a technology for
peer-to-peer media. The interesting part:

- The audio/video flows **directly between the two apps**, not through the
  server. This is cheap and low-latency.
- But the two apps need to "introduce themselves" first (exchange connection
  details). The backend facilitates this introduction — called
  **signaling** — over the WebSocket.
- If direct connection fails (network restrictions), a **TURN server**
  (coturn) relays the media as a fallback.

More detail in `docs/call-flow.md`.
