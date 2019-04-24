import React, { PureComponent } from 'react';
import Trips from './Trips.js'
import MoonCalendar from './MoonCalendar'
export default class Home extends React.PureComponent {
   render() {
     return(
       <div>
         <Trips
           userLocations={this.props.userLocations}/>
       </div>
     )
   }
}
