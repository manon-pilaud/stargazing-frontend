import React from 'react'
import {Button} from 'react-bootstrap'

export default class Location extends React.Component{
   visitLocation=(location)=>{
      fetch('http://localhost:3000/user_locations',{
        method: "POST",
        headers:{
          "Content-Type" : "application/json",
          "Accept" : "application/json"
        },
        body: JSON.stringify({
          user_id: 1,
          location_id: location.id
        })
      })
   }
  render(){
    let {name,description,area,category,country,image,latitude,longitude,rating} = this.props.location
    return !this.props.location?null:(
      <div>
          <center>
          <div>
            <h1>{name}</h1>
            <div id="side-info">
              <div id="side-info-text">
                <h6>area: {area}</h6>
                <h6>Park type: {category}</h6>
                <h6>Country: {country}</h6>
                <img src={`https://www.mapquestapi.com/staticmap/v5/map?key=${process.env.REACT_APP_MAPQUEST_API_KEY}&center=${latitude},${longitude}$zoom=0&size=200,200`}/>
              </div>
          </div>
            <img height="600" width="800"id="location-image" src={image}/>
            <br/>
            <button onClick={()=>this.visitLocation(this.props.location)} type="button" className="btn btn-outline-light">Visit Location</button>
        </div>
        </center>
        <p>{description}</p>
      </div>
    )
  }
}
