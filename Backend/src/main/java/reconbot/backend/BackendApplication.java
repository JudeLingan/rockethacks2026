package reconbot.backend;

public class BackendApplication {
	public static void main(String[] args) {
		ConnectionHandler connectionHandler = new ConnectionHandler();
		connectionHandler.start(12344);

		UserHandler userHandler = new UserHandler();
		userHandler.start(12345, connectionHandler);
	}

}
