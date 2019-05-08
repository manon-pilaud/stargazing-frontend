import React, { PureComponent } from 'react';
import {Link} from 'react-router-dom'
import {Card,CardGroup,Button} from 'react-bootstrap'
export default class Trips extends React.PureComponent {

    handleDeleteButton=(location)=>{
      console.log("attempting to delete",location)
    }
   render() {
     return !this.props.currentUser?null:(
       <div>
       Saved Locations
       <CardGroup>
       {this.props.currentUser.locations.map(location=>
           <Card id="location-card-user" border="primary" style={{ width: '18rem' }}>
             <div id="remove-location-button" onClick={()=>this.handleDeleteButton(location)}>X</div>
             <Link to={`/location/${location.id}`}>
               <Card.Body>
                 <center>
                  <Card.Title>
                    {location.name}
                  </Card.Title>
                </center>
                 <br/>
                 <center>
                   <Card.Img id="location-card-user-img" src={location.image}/>
                </center>
               </Card.Body>
             </Link>
           </Card>
       )}
       </CardGroup>
       </div>
     )
   }
}
