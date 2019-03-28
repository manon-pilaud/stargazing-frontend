import React from 'react'
import {Navbar,Nav,NavItem,NavDropdown,MenuItem} from 'react-bootstrap'


export default class coolNavbar extends React.Component {
  render() {
    return (
      <div>
          <Navbar bg="dark" variant="dark" id="navbar" sticky="top">
          <Navbar.Brand href="#home">StarGazing</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Map</Nav.Link>
            <Nav.Link href="#pricing">Trips</Nav.Link>
          </Nav>
        </Navbar>
      </div>
    )
  }
}
