import React, {PureComponent} from 'react';
import {Form,Button,Col} from 'react-bootstrap'

export default class AddLocation extends PureComponent {
  state={
    name: "",
    image:"",
    country:"",
    area:"",
    longitude:"",
    latitude:""
  }

  handleChange=(e)=>{
    this.setState({
     [e.target.name]: e.target.value
   })
  }

  handleSubmit=(e)=>{
    e.preventDefault()
  }
  render() {
    return (

      <div id="form-create-location">
      <font color="black">
      <Form  onSubmit={(e)=>this.handleSubmit(e)}>
        <Form.Group>
          <Form.Label>Location Name</Form.Label>
          <Form.Control placeholder="Enter Location Name" name="name" onChange={(e)=>this.handleChange(e)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image</Form.Label>
          <Form.Control placeholder="Enter image url" name="image" onChange={(e)=>this.handleChange(e)} />
        </Form.Group>
        <Form.Row>
        <Form.Group as={Col} md="6">
          <Form.Label>Country</Form.Label>
          <Form.Control placeholder="Enter country" name="country" onChange={(e)=>this.handleChange(e)} />
        </Form.Group>
        <Form.Group  as={Col} md="6">
          <Form.Label>Area</Form.Label>
          <Form.Control placeholder="optional" name="area" onChange={(e)=>this.handleChange(e)}/>
        </Form.Group>
        {this.props.coordinates?
        <Form.Group  as={Col} md="6">
          <Form.Label>Latitude</Form.Label>
          <Form.Control placeholder="enter or click on map" value={this.props.coordinates[1]} name="latitude" onChange={(e)=>this.handleChange(e)}/>
        </Form.Group>
        :
        <Form.Group  as={Col} md="6">
          <Form.Label>Latitude</Form.Label>
          <Form.Control placeholder="enter or click on map" name="latitude" onChange={(e)=>this.handleChange(e)}/>
        </Form.Group>
      }
        {this.props.coordinates?
        <Form.Group  as={Col} md="6">
          <Form.Label>Longitude</Form.Label>
          <Form.Control placeholder="enter or click on map" value={this.props.coordinates[0]} name="longitude" onChange={(e)=>this.handleChange(e)}/>
        </Form.Group>
        :
        <Form.Group  as={Col} md="6">
          <Form.Label>Longitude</Form.Label>
          <Form.Control placeholder="enter or click on map"  name="longitude" onChange={(e)=>this.handleChange(e)}/>
        </Form.Group>
      }
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
