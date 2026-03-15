package reconbot.backend;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;

@ServerEndpoint("/websocket/{message}")
public class WebSocketServer {

    @OnOpen
    public void onOpen(Session session, @PathParam("message") String message) {
        System.out.println("Connection opened. Parameter: " + message);
        try {
            session.getBasicRemote().sendText("Connected! You sent: " + message);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @OnMessage
    public void onMessage(String incomingMessage, Session session) {
        System.out.println("Message received: " + incomingMessage);
        try {
            session.getBasicRemote().sendText("Echo: " + incomingMessage);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @OnClose
    public void onClose(Session session, CloseReason reason) {
        System.out.println("Connection closed: " + reason.getReasonPhrase());
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        System.err.println("Error: " + throwable.getMessage());
    }
}
