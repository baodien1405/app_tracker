import React, { Component } from "react";
import { DataGrid } from "@material-ui/data-grid";
import moment from "moment";

class Country extends Component {
  constructor(props) {
    super(props);
    const columns = [
      { field: "Country", headerName: "Country", width: 250 },
      { field: "NewConfirmed", headerName: "NewConfirmed", width: 250 },
      { field: "TotalConfirmed", headerName: "TotalConfirmed", width: 150 },
      { field: "NewDeaths", headerName: "NewDeaths", width: 150 },
      { field: "FormatDate", headerName: "Date", width: 150 },
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
    const displayData = state.displayData.filter((data) => {
      return (
        data.Country === props.selectedCountry || props.selectedCountry === ""
      );
    });
    return { displayData };
  }

  getData = () => {
    fetch("https://api.covid19api.com/summary")
      .then((res) => res.json())
      .then(
        (data) => {
          let dataWithId = data.Countries.map((x, index) =>
            Object.assign(
              {},
              x,
              { id: index },
              { FormatDate: moment(x.Date).format("DD/MM/YYYY") }
            )
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
        <DataGrid rows={this.state.displayData} columns={this.state.columns} />
      </div>
    );
  }
}

export default Country;
