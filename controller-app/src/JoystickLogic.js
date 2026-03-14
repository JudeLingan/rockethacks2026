import { Joystick } from 'react-joystick-component';

function handleMove(event) {
	const paragraph = document.getElementById("joystick-status")

	paragraph.textContent = "moving -> x: " + event.x.toFixed(2) + ", y: " + event.y.toFixed(2)
}

function handleStop() {
	const paragraph = document.getElementById("joystick-status")

	paragraph.textContent = "stopped"
}

export function JoystickLogic() {
	return (
		<Joystick id="joystick" size={100} sticky={false} baseColor="red" stickColor="blue" move={handleMove} stop={handleStop}>
		</Joystick>
	)
}
