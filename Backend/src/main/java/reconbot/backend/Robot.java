package reconbot.backend;

class Robot {
	private String name;

	public Robot() {
	}

	public Robot(String name, String ip) {
		System.out.println("building robot");
		this.name = name;
	}

	@Override
	public String toString() {
		return String.format(
				"Robot[name='%s']",
				name);
	}

	public String getName() {
		return this.name;
	}
}
