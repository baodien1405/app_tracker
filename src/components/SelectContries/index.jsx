import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class SelectCountries extends Component {
  constructor(props) {
    super(props);

    const useStyles = makeStyles((theme) => ({
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    }));

    this.state = {
      rows: [],
      useStyles: useStyles,
      selectedCountry: ''
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch('https://api.covid19api.com/summary')
      .then((res) => res.json())
      .then((data) => {
        let id = 1;
        let dataWithId = data.Countries.map((x) => Object.assign({}, x, { id: id++}));
        dataWithId = dataWithId.sort((a, b) => {
          return a.Country - b.Country;
        });
        this.setState({rows: dataWithId});
        this.props.handleTotalCountry(dataWithId.length)
      },
      (error) => {
        console.log(error);
      }
    )
  }

  handleChange = (e) => {
    console.log('Component country: ', e.target.value);
    this.setState({
      selectedCountry: e.target.value
    })
    this.props.handleChange(e.target.value);
  }

  render() {
    return (
      <div>
        <FormControl className={this.state.useStyles.formControl}>
        <InputLabel id="demo-simple-select-label" style={{color: "white"}}>Select</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          style={{minWidth: 200, color: "white"}}
          value={this.state.selectedCountry}
          onChange={this.handleChange}
        >
          {
            this.state.rows.map((coutry, index) => (<MenuItem key={index} value={coutry.Country}>{coutry.Country}</MenuItem>))
          }
        </Select>
      </FormControl>
      </div>
    );
  }
}

export default SelectCountries;