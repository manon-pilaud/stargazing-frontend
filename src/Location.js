import React from 'react'
import {Button} from 'react-bootstrap'

export default class Location extends React.Component{
  state={
    mapquest: ""
  }
  componentDidMount(){
    fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=${process.env.REACT_APP_MAPQUEST_API_KEY}&location=30.333472,-81.470448&includeRoadMetadata=true&includeNearestIntersection=true`)
    .then(res=>res.json())
    .then(data=>
      this.setState({
        mapquest: data.results[0].locations[0]

      })
    )


  }
  render(){
    let {name,description,area,category,country,image,latitude,longitude,rating} = this.props.location
    return(
      <div>
          <center>
          <div>
            <h1>{name}</h1>
            <div id="side-info">
              <h6>{area}</h6>
              <h6>{category}</h6>
              <h6>{country}</h6>
              <img src={this.state.mapquest.mapUrl}/>
            </div>
            <img  id="location-image" src={image}/>
            <br/>
            <button type="button" className="btn btn-outline-light">Visit Location</button>
        </div>
        </center>
        <p>{description}</p>
      </div>
    )
  }
}
