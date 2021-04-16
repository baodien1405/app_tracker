import React, { Component } from "react";
import "./App.css";
import Country from "./components/Countries";
import MyAppBar from "./components/MyAppBar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedCountry: "" };
  }

  handleChangeCountry = (country) => {
    console.log("App:", country);
  };

  render() {
    return (
      <div className="App">
        <MyAppBar handleChangeCountry={this.handleChangeCountry} />
        <br />
        <Country selectedCountry={this.state.selectedCountry} />
      </div>
    );
  }
}

export default App;
