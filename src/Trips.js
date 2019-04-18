import React, { PureComponent } from 'react';
import {Link} from 'react-router-dom'

export default class Trips extends React.PureComponent {

   render() {
     return(
       <div>
       Saved Locations
        {this.props.userLocations.map(userLocation=>
            <div>
              <Link to={`/location/${userLocation.location.id}`}>
                <div>
                {userLocation.location.name}
                <br/>
                <img height="150" width="180" src={userLocation.location.image}/>
                </div>
              </Link>
            </div>
        )}
       </div>
     )
   }
}
