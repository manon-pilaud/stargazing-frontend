import React, { PureComponent } from 'react';
import Trips from './Trips.js'
import TripsCarousel from './TripsCarousel'
import MoonCalendar from './MoonCalendar'
export default class Home extends React.PureComponent {
   render() {
     return(
       <div>
         <Trips
           currentUser={this.props.currentUser}
           />
         <TripsCarousel
             currentUser={this.props.currentUser}
             />
       </div>
     )
   }
}
