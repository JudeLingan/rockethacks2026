package reconbot.backend;
import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class RobotService {

    private final Map<String, Robot> robots = new ConcurrentHashMap<>();

    // Add or replace a robot
    public Robot addRobot(String name, String ip) {
		System.out.println("adding robot");
        Robot robot = new Robot(name, ip);
        robots.put(name, robot);
        return robot;
    }

    // Get a robot by name
    public Robot getRobot(String name) {
        return robots.get(name);
    }

    // List all robots
    public List<Robot> findAll() {
        return new ArrayList<Robot>(robots.values());
    }

    // Remove a robot
    public void removeRobot(String name) {
        robots.remove(name);
    }
}
