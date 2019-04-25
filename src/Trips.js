import React, { PureComponent } from 'react';
import {Link} from 'react-router-dom'

export default class Trips extends React.PureComponent {

   render() {
     return !this.props.currentUser?null:(
       <div>
       Saved Locations
        {this.props.currentUser.locations.map(location=>
            <div>
              <Link to={`/location/${location.id}`}>
                <div>
                {location.name}
                <br/>
                <img height="150" width="180" src={location.image}/>
                </div>
              </Link>
            </div>
        )}
       </div>
     )
   }
}
