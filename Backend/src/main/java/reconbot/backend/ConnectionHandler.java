package reconbot.backend;

import java.net.*;
import java.io.*;

public class ConnectionHandler {
	private ServerSocket serverSocket;
	private Socket clientSocket;
	private PrintWriter out;
	private BufferedReader in;

	public void start(int port) {
		boolean success = false;
		try {
			System.out.println("Connection Started");
			serverSocket = new ServerSocket(port);
			clientSocket = serverSocket.accept();
			out = new PrintWriter(clientSocket.getOutputStream(), true);
			in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
			success = true;
		}
		catch (Exception e) {
			System.out.println(e.getMessage());
		}
		finally {
			if (!success) {
				stop();
			}
		}
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
	
	public PrintWriter getOut() {
		return out;
	}
}
