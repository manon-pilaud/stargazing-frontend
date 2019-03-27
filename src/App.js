import React, { Component } from 'react';
import './App.css';
import Map from './Map'
import MoonCalendar from './MoonCalendar'
import {Route} from "react-router";
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
        <Route exact={true} path="/map" render={()=>(
          <Map
            locations={this.state.locations}
            />
          )}
        />

      </div>
    )
  }
}


export default App;
