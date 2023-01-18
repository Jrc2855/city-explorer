import './App.css';
import React from 'react';
import axios from 'axios';

//------------Constructor/State handler---------//
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      error: false,
      errorMessage: ''
    }
  }


  //----------City Data Demo Handlers-----------//

  handleInput = (e) => {
    this.setState({
      city: e.target.value
    })
  }

  getCityData = async (e) => {
    e.preventDefault();

    try {
      let url = `https://us1.locationiq.com/v1/search.php?
    key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`
      console.log(url);
      let cityDataFromAxios = await axios.get(url)
      console.log(cityDataFromAxios.data);
      this.setState({
        cityData: cityDataFromAxios.data[0],
        error: false,
        cityMap: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&markers=icon:tiny-red-cutout|${cityDataFromAxios.data[0].lat},${cityDataFromAxios.data[0].lon}&zoom=1`,
        
      })
      
    } catch (error) {
      console.log(error);
      this.setState({
        error: true,
        errorMessage: error.message,
      })
    }
  }


  // getWeather = async () => {
  //   let url = `http://localhost:3001/weather?searchQuery=${this.state.city}&format=json`
  //   let results = await axios.get(url);
  //   console.log(results);
  // }


  //-------------Render Function------------//

  render() {
    // {this.getWeather()};
    return (
      <>
        <h1>City Explorer</h1>
        <form onSubmit={this.getCityData}>
          <label htmlFor="">Pick a City!
            <input type="text" onInput={this.handleInput} />
            <button type="submit">Explore</button>
          </label>
        </form>

        {
          this.state.error
            ? <p>{this.state.errorMessage}</p>
            : <p>Display Name: {this.state.cityData.display_name}</p>
        }
        {
          this.state.error
          ? <p>{this.state.errorMessage}</p>
          : <p>Latitude: {this.state.cityData.lat}</p>
        }
        {
          this.state.error
          ? <p>{this.state.errorMessage}</p>
          : <p>Longitude: {this.state.cityData.lon}</p>
        }
      </>
    )
  }
}

export default App;
