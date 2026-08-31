/**
 * @nova/shared — Core domain types.
 *
 * These types define the shape of the data NOVA works with. Both the
 * frontend (apps/desktop) and the backend (apps/server) import them
 * from this single package, so the two sides can never disagree about
 * what a piece of data looks like.
 */

/** A user account in NOVA. */
export interface User {
  id: string;
  /** Display name shown in the chat sidebar. */
  username: string;
  /** Optional short bio shown in the profile. */
  description?: string;
  /** ISO-8601 timestamp of when the account was created. */
  createdAt: string;
}

/** Presence / availability status of a user. */
export type PresenceStatus = 'online' | 'idle' | 'do-not-disturb' | 'offline';

/** A message sent in a direct conversation. */
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  /** The message body (plain text for now). */
  content: string;
  /** ISO-8601 timestamp of when the message was sent. */
  createdAt: string;
}

/** Result of trying to deliver a message to the backend. */
export type SendMessageResult =
  | { ok: true; message: Message }
  | { ok: false; error: string };
