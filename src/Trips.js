import React, { PureComponent } from 'react';

export default class Trips extends React.PureComponent {
  state={
    userLocations: []
  }
  componentDidMount(){
    fetch('http://localhost:3000/user_locations')
    .then(res=>res.json())
    .then(data=>
        this.setState({userLocations: data})
    )
  }
   render() {
     return(
       <div>
       Saved Locations
        {this.state.userLocations.map(userLocation=>
          <div>
            {userLocation.location.name}
            <br/>
            <img height="150" width="180" src={userLocation.location.image}/>
          </div>
        )}
       </div>
     )
   }
}
