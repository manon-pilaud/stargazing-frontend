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

  postLocation=(form)=>{
    console.log(form)
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
