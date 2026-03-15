package reconbot.backend;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

/**
 * Accepts WebSocket connections from the browser frontend.
 * Each text frame received (e.g. "F\n", "B\n") is forwarded
 * directly to ConnectionHandler, which relays it to the Pi over TCP (port 12344).
 */
public class UserHandler extends TextWebSocketHandler {

    private final ConnectionHandler connectionHandler;

    public UserHandler(ConnectionHandler connectionHandler) {
        this.connectionHandler = connectionHandler;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        System.out.println("Frontend connected: " + session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) {
        String payload = message.getPayload().trim();
        if (payload.isEmpty()) return;
        System.out.println("CMD from frontend: " + payload);
        connectionHandler.getOut().println(payload);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session,
                                      org.springframework.web.socket.CloseStatus status) {
        System.out.println("Frontend disconnected: " + session.getId());
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable ex) {
        System.out.println("WebSocket error: " + ex.getMessage());
    }
}

