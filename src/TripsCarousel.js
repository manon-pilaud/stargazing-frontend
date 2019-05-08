import React, { PureComponent } from 'react';
import {Link} from 'react-router-dom'
import {Card,CardGroup,Button} from 'react-bootstrap'
export default class TripsCarousel extends React.PureComponent {
    state = {
      currentImageIndex: 0
    }

    componentDidMount() {
    this.interval = setInterval(this.startInterval, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    startInterval = () => {

      console.log(this.state.currentImageIndex)
      if(this.state.currentImageIndex >= this.props.currentUser.locations.length -1){
        this.setState({
          currentImageIndex: 0
        })
      }
      else{
        this.setState({
          currentImageIndex: this.state.currentImageIndex + 1
        })
      }
    }

   render() {
     return !this.props.currentUser?null:(
       <div>
       Saved Locations
       <CardGroup>
           <Card id="location-card-user" border="primary" style={{ width: '18rem' }}>
             <div id="remove-location-button"></div>
             <Link to={`/location/${this.props.currentUser.locations[this.state.currentImageIndex].id}`}>
               <Card.Body>
                 <center>
                  <Card.Title>
                    {this.props.currentUser.locations[this.state.currentImageIndex].name}
                  </Card.Title>
                </center>
                 <br/>
                 <center>
                   <Card.Img id="location-card-user-img" src={this.props.currentUser.locations[this.state.currentImageIndex].image}/>
                </center>
               </Card.Body>
             </Link>
           </Card>
       </CardGroup>
       </div>
     )
   }
}
