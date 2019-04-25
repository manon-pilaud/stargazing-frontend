import React, { Component } from 'react';
import './App.css';
import Map from './Map'
import MoonCalendar from './MoonCalendar'
import Location from './Location'
import Home from './Home'
import {Route,Switch,Redirect,withRouter } from "react-router";
import Navbar from './Navbar'
import Trips from './Trips'
import SignUp from './SignUp'
import SignIn from './SignIn'
class App extends Component {
  state={
    currentUser: null,
    locations: [],
    userLocations: []
  }

  componentDidMount(){
    this.fetchLocations()
    this.fetchUserLocations()
    this.fetchCurrentUser()
  }

  fetchCurrentUser=()=>{
    let token = localStorage.getItem('token')
    if(token){
      fetch(`http://localhost:3000/api/v1/profile`, {
        method: "GET",
        headers: {
          "Authentication": `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          currentUser: data
        })
      })
    }
  }

    handleLoginSubmit = (username, password) => {
      console.log("in handle login submit",username,password)
    fetch(`http://localhost:3000/api/v1/login`, {
      method: "POST",
        headers: {
          "Content-Type":"application/json",
          "Accept":"application/json"
        },
        body: JSON.stringify({
          username:username,
          password:password
        })
    })
    .then(res =>res.json())
    .then(data => {
      if(data.error){
        alert('Incorrect username or password')
      }else{
        this.setState({currentUser: data.userInfo })
        localStorage.setItem("token", data.token)
      }
    })
  };

  fetchLocations=()=>{
    fetch('http://localhost:3000/api/v1/locations')
    .then(res=>res.json())
    .then(data=>
      this.setState({
        locations: data
      })
    )
  }
  fetchUserLocations=()=>{
    fetch('http://localhost:3000/api/v1/user_locations')
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
      <Switch>
        <Route exact path="/" render={()=><Redirect to="/home"/>}/>
      </Switch>
      <Route exact={true} path="/signup" render={()=>(
          <SignUp

            />
          )}
      />
    <Route exact={true} path="/signin" render={()=>(
          <SignIn
            onLogIn={this.handleLoginSubmit}
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


export default withRouter(App);
