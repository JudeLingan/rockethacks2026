package reconbot.backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
class BeanConfiguration implements WebSocketConfigurer {

    private ConnectionHandler connectionHandler;

    @Bean
    public ConnectionHandler connectionHandler() {
        ConnectionHandler ch = new ConnectionHandler();
        // Connect to Pi TCP server on port 12344 in a background thread
        // so Spring Boot startup isn't blocked
        Thread t = new Thread(() -> ch.start(12344));
        t.setDaemon(true);
        t.start();
		connectionHandler = ch;
        return ch;
    }

    @Bean
    public UserHandler userHandler() {
        return new UserHandler(connectionHandler());
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry
            .addHandler(userHandler(), "/control")
            .setAllowedOrigins("*");  // allow the React dev server and any browser origin
    }
}

