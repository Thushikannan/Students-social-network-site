import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../index.css';
  
export default class DateTime extends React.Component {
  state = {
    startDate: new Date()
  };
 
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
 
  render() {
    return (
      <DatePicker className="clock_date"
        selected={this.state.startDate}
        onChange={this.handleChange}
      />
    );
  }
}
