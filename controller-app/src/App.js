import './App.css';
import { JoystickLogic } from './JoystickLogic';

function App() {
  return (
    <div className="App">
      <header className="App-header">
		<JoystickLogic />
		<p id="joystick-status">
			stopped
		</p>
      </header>
    </div>
  );
}

export default App;
