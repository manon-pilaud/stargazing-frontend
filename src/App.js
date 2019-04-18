import React, { Component } from 'react';
import './App.css';
import Map from './Map'
import MoonCalendar from './MoonCalendar'
import Location from './Location'
import Home from './Home'
import {Route} from "react-router";
import Navbar from './Navbar'
import Trips from './Trips'
class App extends Component {
  state={
    locations: [],
    userLocations: []
  }

  componentDidMount(){
    this.fetchLocations()
    this.fetchUserLocations()
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
  fetchUserLocations=()=>{
    fetch('http://localhost:3000/user_locations')
    .then(res=>res.json())
    .then(data=>
        this.setState({userLocations: data})
    )
  }

  postLocation=(form)=>{
    fetch('http://localhost:3000/locations',{
    method: "POST",
    headers:{
      "Content-Type" : "application/json",
      "Accept" : "application/json"
    },
    body: JSON.stringify({
      name: form.name,
      description: form.description,
      latitude: form.latitude ,
      longitude: form.longitude ,
      category: "user created",
      image: form.image,
      area: form.area,
      country: form.country,
      creator: 1,
    })
  })
  .then(res=>res.json())
  .then(data=>this.addLocation(data))
  }

  addLocation=(newLocation)=>{
      if (!this.state.locations.includes(newLocation)){
        this.setState({
          locations: [...this.state.locations, newLocation]
        })
      }
  }

  addUserLocation=(newUserLocation)=>{
    if (!this.state.userLocations.includes(newUserLocation)){
      this.setState({
        userLocations: [...this.state.userLocations, newUserLocation]
      })
    }
  }
render() {
    return(
      <div>
        <Navbar/>
        <Route exact={true} path="/map" render={()=>(
          <Map
            locations={this.state.locations}
            postLocation={this.postLocation}
            />
          )}
        />
      <Route exact={true} path="/home" render={()=>(
          <Home
            userLocations={this.state.userLocations}
            />
          )}
        />
      <Route exact={true} path="/location/:id" render={(props)=>{
            let locationUrlId = props.match.params.id
            let locationUrlIdInt = parseInt(locationUrlId)
            let locationInfo = this.state.locations.find(location => location.id === locationUrlIdInt)
            return locationInfo?(
              <Location
                location = {locationInfo}
                addUserLocation = {this.addUserLocation}/>
          ):null
        }
      }
      />
      </div>
    )
  }
}


export default App;
