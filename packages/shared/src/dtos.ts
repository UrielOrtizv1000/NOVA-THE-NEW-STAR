/**
 * @nova/shared — Data transfer objects (DTOs).
 *
 * DTOs describe the data that enters and leaves the HTTP API. They are
 * the contracts for request bodies and responses. The backend validates
 * incoming DTOs against these shapes (see the security rules: never
 * trust the frontend, validate everything on the server).
 */

import type { User } from './types';

/** Body of a request to create an account. */
export interface CreateUserDto {
  username: string;
  password: string;
}

/** Public user data sent to the client (never includes the password). */
export type PublicUser = Pick<User, 'id' | 'username' | 'description' | 'createdAt'>;
