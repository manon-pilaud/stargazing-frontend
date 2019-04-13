import React from 'react'
import {Navbar,Nav,NavItem,NavDropdown,MenuItem} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default class coolNavbar extends React.Component {
  render() {
    return (
      <div>
          <Navbar bg="dark" variant="dark" id="navbar" sticky="top">
          <Navbar.Brand>StarGazing</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link><Link className="navlink"  to={'/home'}>Home</Link></Nav.Link>
            <Nav.Link><Link className="navlink" to={'/map'}>StarMap</Link></Nav.Link>
            <Nav.Link><Link className="navlink">Trips</Link></Nav.Link>
          </Nav>
        </Navbar>
      </div>
    )
  }
}
