public class Main {
	public static void main(String[] args) {
		try {
			Connection connection = new Connection();
			connection.startConnection("127.0.0.1", 12345);
			System.out.println(connection.sendMessage("Hello World!"));
			connection.stopConnection();
		}
		catch (Exception e) {
			System.out.println(e.getMessage());
			System.exit(1);
		}
	}
}
