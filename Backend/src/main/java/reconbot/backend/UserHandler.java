package reconbot.backend;

import java.net.*;
import java.io.*;
import java.util.concurrent.atomic.AtomicInteger;

public class UserHandler {
	private ServerSocket serverSocket;
	private Socket clientSocket;
	private PrintWriter out;
	private BufferedReader in;
	private AtomicInteger currentChar;

	public UserHandler() {
		currentChar = new AtomicInteger();
		currentChar.set('s');
	}

	public void start(int port, ConnectionHandler connectionHandler) {
		try {
			System.out.println("Connection Started");
			serverSocket = new ServerSocket(port);
			clientSocket = serverSocket.accept();
			out = new PrintWriter(clientSocket.getOutputStream(), true);
			in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
			while (true) {
				String nextLine = in.readLine();
				if (nextLine == null) continue;
				System.out.println(nextLine);
				connectionHandler.getOut().println(nextLine);
			}
		}
		catch (Exception e) {
			System.out.println(e.getMessage());
			System.exit(1);
		}
		System.out.println("init complete");
	}

	public char getCurrentChar() {
		return (char)currentChar.get();
	}

	public void stop() {
		try {
			in.close();
			out.close();
			clientSocket.close();
			serverSocket.close();
		}
		catch (Exception e) {
			System.out.println(e.getMessage());
			System.exit(1);
		}
	}
}
