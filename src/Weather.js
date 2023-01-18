import React from "react";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: '',
      forecastData: [],
    }
  }
}
export default Weather;