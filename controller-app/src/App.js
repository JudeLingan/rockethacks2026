import './App.css';
import { Joystick } from 'react-joystick-component';

function handleMove(event) {
	const paragraph = document.getElementById("joystick-status")

	paragraph.textContent = "moving -> x: " + event.x.toFixed(2) + ", y: " + event.y.toFixed(2)
}

function handleStop() {
	const paragraph = document.getElementById("joystick-status")

	paragraph.textContent = "stopped"
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
		<Joystick id="joystick" size={100} sticky={false} baseColor="red" stickColor="blue" move={handleMove} stop={handleStop}>
		</Joystick>
		<p id="joystick-status">
			stopped
		</p>
      </header>
    </div>
  );
}

export default App;
