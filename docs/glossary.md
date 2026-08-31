# Glossary

Terms used throughout NOVA, explained for engineering students. Each entry
gives a short definition and, where useful, *why* it matters in this project.

## TypeScript
A superset of JavaScript that adds static types. "Static types" means the
compiler checks what values your functions receive and return *before* the
code runs, catching many bugs at compile time. NOVA uses it everywhere so the
types document how the pieces connect.

## Monorepo
One repository containing several related projects. NOVA keeps the desktop
app, the backend, and the shared types in a single repository managed with
`pnpm` workspaces. Benefit: the pieces evolve together and share code easily.

## WebSocket
A persistent, two-way communication channel between a client and a server
over a single connection. Unlike HTTP (request → response), either side can
send a message at any time, which is what makes real-time chat possible.

## Socket.IO
A library built on top of WebSocket that adds rooms, reconnection, and
fallbacks. NOVA uses it for the real-time chat and call-signaling layer.

## REST / HTTP API
The request-response interface the desktop app uses to talk to the backend
for things like login and fetching data. Each endpoint is a URL + method
(GET/POST/...). The backend is the only thing that talks to the database.

## NestJS
A framework for building Node.js backends with a structured, modular design
(modules, dependency injection, decorators). It is the standard for serious
TypeScript backends. NOVA uses it to keep the server organized as it grows.

## PostgreSQL
An open-source relational database. "Relational" means data is organized in
tables with rows and columns, and related data can be joined. It is the
**source of truth** for NOVA — where messages and accounts are stored.

## Redis
An in-memory data store, very fast. NOVA uses it (optionally) for presence
status (who is online). "In-memory" means it trades durability for speed.

## DTO (Data Transfer Object)
An object that defines the shape of data entering or leaving an API. NOVA
defines DTOs in `packages/shared` so the frontend and backend agree on the
contract.

## WebRTC
A web standard for peer-to-peer audio, video, and data between browsers/apps
without a server relaying the media. Used by NOVA for calls.

## Signaling
The process by which two WebRTC peers exchange connection details before
connecting directly. In NOVA, the backend relays these signals over
WebSocket but is not in the media path.

## STUN
A server that tells a peer its public IP address and port, helping it set up
a direct connection. Part of the WebRTC toolbox.

## TURN
A server that relays media when a direct connection is impossible (strict
firewalls/NAT). NOVA uses coturn as its TURN fallback.

## P2P (Peer-to-Peer)
Communication directly between two devices, without a central server in the
data path. NOVA's calls are P2P with TURN as a fallback.

## Tauri
A framework for building lightweight desktop apps: a React/TypeScript
frontend running inside a native window, with a tiny Rust shell. It is the
successor philosophy to Electron but much smaller (~10-20 MB vs ~150-300 MB).

## AGPL-3.0
The open-source license NOVA is published under. It allows anyone to use,
study, and self-host the code, and requires anyone who modifies it and offers
it over a network to share their changes.

## CORS
A browser security mechanism controlling which origins may call your API.
NOVA configures it so only the desktop app can talk to the backend.

## JWT (JSON Web Token)
A signed token used for authentication. NOVA's security rules prefer
httpOnly+Secure cookies over storing JWTs in the browser, to reduce risk.

## Idempotency
The property that performing an operation multiple times has the same effect
as performing it once. Important for payments or creating records, to avoid
duplicates when a client retries a request.
