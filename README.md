<p align="center">
  <img src="logo-NOVA.png" alt="NOVA — THE NEW STAR" width="600">
</p>

# NOVA — THE NEW STAR

Private messaging for two people, with the quality that today's messaging apps have stopped offering.

## Why NOVA

There are plenty of messaging apps out there, but almost none built for what we actually need: private, simple, direct communication between two people. Most are mass services that sell your information, full of noise, unnecessary features, and a quality that degrades over time.

**NOVA exists to improve that.** We are not reinventing the wheel: we take what works and do it well, with a polished experience, no spam, no invasive telemetry, and a distinct aesthetic of its own. A personal tool that puts quality over scale.

## About the project

This is a **personal, open-source project** that will keep **improving over time**. It starts as a desktop app for two people and grows as details are refined, features are added, and the experience is polished.

It is built to be read and understood — with clear code, detailed comments, and didactic documentation — so that engineering students anywhere in the world can learn from a real, working project.

## Getting started

### Prerequisites
- [Node.js](https://nodejs.org) (LTS)
- [pnpm](https://pnpm.io)
- [Docker](https://www.docker.com) (for PostgreSQL and Redis)
- [Rust](https://rustup.rs) + [MSVC Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) (for the Tauri desktop app)

### Install and run
```bash
# 1. Install dependencies (all workspaces at once)
pnpm install

# 2. Start the development database (PostgreSQL + Redis)
docker compose up -d

# 3. Copy the environment template and fill in local values
cp .env.example .env
```

### Documentation
For students and contributors, the project ships with didactic docs:

- [Architecture](docs/architecture.md) — how the pieces fit together
- [Message flow](docs/message-flow.md) — the central end-to-end flow
- [Call flow](docs/call-flow.md) — WebRTC voice/video/screen sharing
- [Glossary](docs/glossary.md) — terms explained

## Project layout

```text
apps/desktop     Desktop app (Tauri: React + minimal Rust shell)
apps/server      Backend API + realtime layer (NestJS + Socket.IO)
packages/shared  Types and contracts shared by frontend and backend
docs/            Didactic documentation
```

## License

Licensed under the [GNU AGPL-3.0](LICENSE).
