import './App.css';
import React from 'react';
import axios from 'axios';
// import Weather from './Weather'

//------------Constructor/State handler---------//
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      cityMap: '',
      weatherData1: {},
      weatherData2: {},
      weatherData3: {},
      error: false,
      errorMessage: '',
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
      let lat = cityDataFromAxios.data[0].lat;
      let lon = cityDataFromAxios.data[0].lon;
      
      this.getWeather(lat, lon);
      
      this.setState({
        cityData: cityDataFromAxios.data[0],
        error: false,
        cityMap: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${lat},${lon}&zoom=12&size=400x400&format=png`,
        
      })
      
    } catch (error) {
      console.log(error);
      this.setState({
        error: true,
        errorMessage: error.message,
      })
    }
  }
  
  getWeather = async (lat, lon) => {
    
    try {
      let url = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.city}&lat=${lat}&lon=${lon}`
      let weatherDataFromAxios = await axios.get(url);
      console.log(weatherDataFromAxios);
      
      this.setState({
        weatherData1: weatherDataFromAxios.data[0],
        weatherData2: weatherDataFromAxios.data[1],
        weatherData3: weatherDataFromAxios.data[2],
      })
      
    } catch (error) {
      console.log(error.Message);
    }
  }


  //-------------Render Function------------//

  render() {
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
        {
          Object.keys(this.state.weatherData1).length>0 
          && 
          <>
          <p>Weather Description: {this.state.weatherData1.description}</p>
          <p>Search Date: {this.state.weatherData1.date}</p>
          </>
        }
        {
          Object.keys(this.state.weatherData2).length>0 
          && 
          <>
          <p>Weather Description: {this.state.weatherData2.description}</p>
          <p>Search Date: {this.state.weatherData2.date}</p>
          </>
        }
        {
          Object.keys(this.state.weatherData3).length>0 
          && 
          <>
          <p>Weather Description: {this.state.weatherData3.description}</p>
          <p>Search Date: {this.state.weatherData3.date}</p>
          </>
        }
        {
          this.state.cityMap 
          ? <img src = {this.state.cityMap} alt = 'map'/>
          : null
        }
      </>
    )
  }
}

export default App;
