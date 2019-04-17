import React, {PureComponent} from 'react';
import {Form,Button,Col} from 'react-bootstrap'

export default class AddLocation extends PureComponent {
  state={
    name: "",
    description:"",
    image:"",
    country:"",
    area:"",
    longitude:"",
    latitude:""
  }


  componentWillUnmount() {
    this.setState({
      name: "",
      description:"",
      image:"",
      country:"",
      area:"",
      longitude:"",
      latitude:""
    })
  }

  handleChange=(e)=>{
    this.setState({
     [e.target.name]: e.target.value
   })
  }

  handleSubmit=(e)=>{
    e.preventDefault()
    this.props.postLocation(this.state,this.props.coordinates)
  }


static getDerivedStateFromProps(nextProps, prevState){
     if(nextProps.coordinates!==prevState.coordinates && nextProps.coordinates !== ""){
       return { longitude: nextProps.coordinates[0] , latitude: nextProps.coordinates[1]};
    }
    else return null;
}

  render() {
    console.log(this.state)
    return (
      <div id="form-create-location">
      <font color="black">
      <Form  onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>Location Name</Form.Label>
          <Form.Control placeholder="Enter Location Name" name="name" onChange={this.handleChange} />
        </Form.Group>
        <Form.Group >
           <Form.Label>Description</Form.Label>
           <Form.Control as="textarea" rows="3" name="description" onChange={this.handleChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Image</Form.Label>
          <Form.Control placeholder="Enter image url" name="image" onChange={this.handleChange} />
        </Form.Group>
        <Form.Row>
        <Form.Group as={Col} md="6">
          <Form.Label>Country</Form.Label>
          <Form.Control placeholder="Enter country" name="country" onChange={this.handleChange} />
        </Form.Group>
        <Form.Group  as={Col} md="6">
          <Form.Label>Area</Form.Label>
          <Form.Control placeholder="optional" name="area" onChange={this.handleChange}/>
        </Form.Group>
        <Form.Group  as={Col} md="6">
          <Form.Label>Latitude</Form.Label>
          <Form.Control placeholder="enter or click on map" value={this.state.latitude} name="latitude" onChange={this.handleChange}/>
        </Form.Group>
        <Form.Group  as={Col} md="6">
          <Form.Label>Longitude</Form.Label>
          <Form.Control placeholder="enter or click on map" value={this.state.longitude} name="longitude" onChange={this.handleChange}/>
        </Form.Group>
      </Form.Row>
        <Button variant="primary" type="submit">
          Create Location
        </Button>
    </Form>
      </font>
      </div>
    )
  }
}
