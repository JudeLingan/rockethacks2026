package reconbot.backend;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class Registration {
	@Autowired
	RobotService robotService;

	@GetMapping("/robots")
	public List<Robot> findAll() {
		return robotService.findAll();
	}

	@PostMapping("/robots")
	public Robot registerRobot(@RequestParam String name, @RequestParam String ip) {
		return robotService.addRobot(name, ip);
	}
}
