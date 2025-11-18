## Real-Time Features (WebSockets & SSE)

### WebSockets vs Server-Sent Events

| Feature                | WebSockets                       | Server-Sent Events (SSE)         |
| ---------------------- | -------------------------------- | -------------------------------- |
| Communication          | Bidirectional (client ↔️ server) | Unidirectional (server → client) |
| Protocol               | WebSocket (WS/WSS)               | HTTP/HTTPS                       |
| Use Cases              | Chat, collaborative editing      | Notifications, live feeds        |
| Automatic Reconnection | Manual                           | Automatic                        |
| Complexity             | Higher                           | Lower                            |

**DineLocal Use Cases:**

- **SSE:** Booking notifications, availability updates, new reviews
- **WebSockets:** Chat between guests/hosts (if needed)

**For full implementation examples, see:**

- Server-Sent Events: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
- Socket.io: https://socket.io/docs/v4/

---

