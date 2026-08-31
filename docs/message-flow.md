# Message flow: from keystroke to the other screen

This is the step-by-step journey of a message. It is the most important flow
in NOVA and the best starting point to understand the codebase.

## 1. The user types and presses Enter

In the React UI, the `Chat` component has a text input. When the user presses
Enter, the component builds a `Message` and hands it to the WebSocket
connection:

```ts
// apps/desktop/src/ui/Chat.tsx (simplified)
const message: Message = {
  id: generateId(),
  conversationId: activeConversationId,
  senderId: myUserId,
  content: inputValue,
  createdAt: new Date().toISOString(),
};
socket.emit('message:send', message);
```

## 2. The message travels over the WebSocket

`socket.emit` sends the message to the backend. The **type** of the event
(`message:send`) and the payload are both defined in
`packages/shared/ws-messages.ts`, so the server knows exactly what to expect.

## 3. The backend receives and validates it

On the server, the Socket.IO gateway handles the `message:send` event. Its
first job is **validation** — never trust what comes from the client:

```ts
// apps/server/src/chat/ (conceptually)
onMessageSend(@Payload() payload: SendMessagePayload): void {
  // 1. Is the payload the right shape?   -> validation
  // 2. Is the sender authorized to post here? -> authorization
  // 3. Is the content valid (length, no injection)? -> sanitization
}
```

This follows the rule: **validate input, authorize by resource, never trust
the frontend.**

## 4. The backend saves it to PostgreSQL

Once validated, the message is stored. PostgreSQL is the **source of truth** —
if the app restarts, the message is still there.

```ts
await this.messageRepo.save({
  id: message.id,
  conversationId: message.conversationId,
  senderId: message.senderId,
  content: message.content,
  createdAt: message.createdAt,
});
```

## 5. The backend forwards it to the other participant

The other person also has a WebSocket connection open. The server looks up
that connection and pushes the message to it:

```ts
// send the same message to the recipient's socket
recipientSocket.emit('message:new', { message });
```

## 6. The recipient's app renders it

The other desktop app receives `message:new`, updates its local state, and
React re-renders the chat so the message appears — no page refresh needed.

## Why this design is good (learn this pattern)

- **Validation on the server** means a malicious client can't inject garbage.
- **Persistence in the database** means messages survive restarts.
- **WebSocket push** means real-time delivery without polling.
- **Shared types** mean the frontend and backend can't drift apart on the data
  shape — a compile-time safety net across the whole flow.
