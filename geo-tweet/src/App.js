
import './App.css';
import Dash from "./Components/Main.js";
import ToggleButtons from "./Components/Toggle"



function App() {
  return (
    <div className="App">
      <header className="App-header">  
          <h1>Geo Tweet</h1>
          <Dash/>
          {/* <ToggleButtons/> */}
      </header>
    </div>
  );
}

export default App;
