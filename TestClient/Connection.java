import java.net.*;
import java.io.*;

class Connection {
	private Socket clientSocket;
	private PrintWriter out;
	private BufferedReader in;

	public void startConnection(String ip, int port) throws Exception {
		try {
			clientSocket = new Socket(ip, port);
			out = new PrintWriter(clientSocket.getOutputStream(), true);
			in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
		}
		catch (Exception e) {
			throw e;
		}
	}

	public String sendMessage(String msg) throws Exception {
		try {
			out.println(msg);
			String resp = in.readLine();
			return resp;
		}
		catch (Exception e) {
			throw e;
		}
	}

	public void stopConnection() throws Exception {
		try {
			in.close();
			out.close();
			clientSocket.close();
		}
		catch (Exception e) {
			throw e;
		}
	}
}
