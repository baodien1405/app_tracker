import React, { Component } from "react";
import "./App.css";
import Country from "./components/Countries";
import MyAppBar from "./components/MyAppBar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyAppBar />
        <br />
        <Country />
      </div>
    );
  }
}

export default App;
