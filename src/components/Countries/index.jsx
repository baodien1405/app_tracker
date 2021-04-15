import React, {Component} from 'react';
import { DataGrid } from '@material-ui/data-grid';

class Country extends Component {
  constructor(props) {
    super(props);
    const columns = [
      { field: 'Country', headerName: 'Country', width: 150 },
      { field: 'Slug', headerName: 'Slug', width: 150 },
      { field: 'ISO2', headerName: 'ISO2', width: 150 },
    ];
    this.state = {
      rows: [],
      columns: columns
    }
  }
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch('https://api.covid19api.com/countries')
      .then((res) => res.json())
      .then((data) => {
        let id = 1;
        const dataWithId = data.map((x) => Object.assign({}, x, { id: id++}));
        this.setState({rows: dataWithId})
      },
      (error) => {
        console.log(error);
      }
    )
  }

  render() {
    return (
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid rows={this.state.rows} columns={this.state.columns} />
      </div>
    );
  }
}

export default Country;