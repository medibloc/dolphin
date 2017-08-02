import React, { Component } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

export class NavBar extends Component {
  render() {
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>Dolphin</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to='/setup'><NavItem>Setup</NavItem></LinkContainer>
            <LinkContainer exact={true} to='/'><NavItem>Upload History</NavItem></LinkContainer>
          </Nav>
          <Nav pullRight>
            <NavDropdown eventKey={3} title="My Account" id="basic-nav-dropdown">
              <LinkContainer to='my_profile'><MenuItem eventKey={3.1}>Profile</MenuItem></LinkContainer>
              <MenuItem eventKey={3.2}>My Medical Histories</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Log Out</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
