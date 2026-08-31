/**
 * @nova/shared — WebSocket protocol messages.
 *
 * The desktop app and the backend communicate in real time over a
 * WebSocket (Socket.IO). Every message that travels over that socket
 * has a `type` and a payload. This file defines the full set of events
 * so both sides share one source of truth for the protocol.
 */

import type { Message, PresenceStatus } from './types';

/** Every event the client can send to the server. */
export type ClientEvent =
  | { type: 'message:send'; conversationId: string; content: string }
  | { type: 'presence:update'; status: PresenceStatus }
  | { type: 'call:signal'; signal: unknown };

/** Every event the server can send to the client. */
export type ServerEvent =
  | { type: 'message:new'; message: Message }
  | { type: 'presence:changed'; userId: string; status: PresenceStatus }
  | { type: 'call:signal'; fromUserId: string; signal: unknown };
