import "./App.css";
import Country from "./components/Countries";
import MyAppBar from "./components/MyAppBar";

function App() {
  return (
    <div className="App">
      <MyAppBar />
      <br />
      <Country />
    </div>
  );
}

export default App;
