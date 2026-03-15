package reconbot.backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
class BeanConfiguration {
	@Bean
	public ConnectionHandler connectionHandler() {
		ConnectionHandler connectionHandler = new ConnectionHandler();
		connectionHandler.start(12345);
		return connectionHandler;
	}
}
