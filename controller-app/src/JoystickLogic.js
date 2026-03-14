import { Joystick } from 'react-joystick-component';

var dir = {
	x: 0.0,
	y: 0.0
}

function setDir(x, y) {
	dir.x = x
	dir.y = y

	const paragraph = document.getElementById("joystick-status")
	paragraph.textContent = "moving -> x: " + x.toFixed(2) + ", y: " + y.toFixed(2)
}

function handleMove(event) {
	setDir(event.x, event.y)
}

function handleStop() {
	setDir(0.0, 0.0)
}

export function JoystickLogic() {
	return (
		<Joystick id="joystick" size={100} sticky={false} baseColor="red" stickColor="blue" move={handleMove} stop={handleStop}>
		</Joystick>
	)
}
