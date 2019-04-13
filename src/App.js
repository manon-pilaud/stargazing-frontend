import React, { Component } from 'react';
import './App.css';
import Map from './Map'
import MoonCalendar from './MoonCalendar'
import Location from './Location'
import {Route} from "react-router";
import Navbar from './Navbar'
class App extends Component {
  state={
    locations: []
  }
  componentDidMount(){
    this.fetchLocations()
  }

  fetchLocations=()=>{
    fetch('http://localhost:3000/locations')
    .then(res=>res.json())
    .then(data=>
      this.setState({
        locations: data
      })
    )
  }
render() {
    return(
      <div>
        <Navbar/>
        <MoonCalendar/>
        <Route exact={true} path="/map" render={()=>(
          <Map
            locations={this.state.locations}
            />
          )}
        />
      <Route exact={true} path="/location/:id" render={(props)=>{
            let locationUrlId = props.match.params.id
            let locationUrlIdInt = parseInt(locationUrlId)
            let locationInfo = this.state.locations.find(location => location.id === locationUrlIdInt)
            return locationInfo?(
              <Location location = {locationInfo}/>
          ):null
        }
      }
      />

      </div>
    )
  }
}


export default App;
