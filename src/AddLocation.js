import React, {PureComponent} from 'react';
import {Form,Button,Col} from 'react-bootstrap'

export default class AddLocation extends PureComponent {
  render() {
    console.log("hello",this.props)
    return (

      <div id="form-create-location">
      <font color="black">
      <Form>
        <Form.Group>
          <Form.Label>Location Name</Form.Label>
          <Form.Control placeholder="Enter Location Name" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image</Form.Label>
          <Form.Control placeholder="Enter image url" />
        </Form.Group>
        <Form.Row>
        <Form.Group as={Col} md="6">
          <Form.Label>Country</Form.Label>
          <Form.Control placeholder="Enter country" />
        </Form.Group>
        <Form.Group  as={Col} md="6">
          <Form.Label>Area</Form.Label>
          <Form.Control placeholder="optional"/>
        </Form.Group>
        {this.props.coordinates?
        <Form.Group  as={Col} md="6">
          <Form.Label>Latitude</Form.Label>
          <Form.Control placeholder="enter or click on map" value={this.props.coordinates[1]}/>
        </Form.Group>
        :
        <Form.Group  as={Col} md="6">
          <Form.Label>Latitude</Form.Label>
          <Form.Control placeholder="enter or click on map"/>
        </Form.Group>
      }
        {this.props.coordinates?
        <Form.Group  as={Col} md="6">
          <Form.Label>Longitude</Form.Label>
          <Form.Control placeholder="enter or click on map" value={this.props.coordinates[0]}/>
        </Form.Group>
        :
        <Form.Group  as={Col} md="6">
          <Form.Label>Longitude</Form.Label>
          <Form.Control placeholder="enter or click on map"/>
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
