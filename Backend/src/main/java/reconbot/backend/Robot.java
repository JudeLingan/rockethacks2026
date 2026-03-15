package reconbot.backend;

import org.springframework.integration.ip.udp.outbound.UnicastSendingMessageHandler;

import com.fasterxml.jackson.annotation.JsonIgnore;

class Robot {
	private String name;

	@JsonIgnore
	private UnicastSendingMessageHandler socket;

	public Robot() {
	}

	public Robot(String name, String ip) {
		System.out.println("building robot");
		this.name = name;
		socket = new UnicastSendingMessageHandler(ip, 3244);
	}

	@Override
	public String toString() {
		return String.format(
				"Robot[name='%s', socket='%s']",
				name, socket.getDestinationAddress());
	}

	public String getName() {
		return this.name;
	}

	public UnicastSendingMessageHandler getSocket() {
		return this.socket;
	}
}
