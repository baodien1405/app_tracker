import React, { Component } from "react";
import { DataGrid } from "@material-ui/data-grid";

class Country extends Component {
  constructor(props) {
    super(props);
    const columns = [
      { field: "Country", headerName: "Country", width: 250 },
      { field: "NewConfirmed", headerName: "NewConfirmed", width: 250 },
      { field: "TotalConfirmed", headerName: "TotalConfirmed", width: 150 },
    ];
    this.state = {
      rows: [],
      selectedCountry: this.props.selectedCountry,
      displayData: [],
      columns: columns,
    };
  }

  componentDidMount() {
    this.getData();
  }

  static getDerivedStateFromProps(props, state) {
    const displayData = state.rows.filter((data) => {
      return (
        data.Country === props.selectedCountry || props.selectedCountry === ""
      );
    });
    return { displayData: displayData };
  }

  getData = () => {
    fetch("https://api.covid19api.com/summary")
      .then((res) => res.json())
      .then(
        (data) => {
          let id = 1;
          let dataWithId = data.Countries.map((x) =>
            Object.assign({}, x, { id: id++ })
          );
          dataWithId = dataWithId.sort((a, b) => {
            return a.Country - b.Country;
          });
          const displayData = [...dataWithId];
          this.setState({ rows: dataWithId, displayData: displayData });
        },
        (error) => {
          console.log(error);
        }
      );
  };

  render() {
    return (
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid rows={this.state.rows} columns={this.state.columns} />
      </div>
    );
  }
}

export default Country;
