import React from 'react'

export default class Location extends React.Component{
  render(){
    console.log(this.props.location)
    let {name,description,area,category,country,image,latitude,longitude,rating} = this.props.location
    return(
      <div>
          <center>
          <div>
            <h1>{name}</h1>
            <img src={image}/>
        </div>
        </center>
        <p>{description}</p>
      </div>
    )
  }
}
