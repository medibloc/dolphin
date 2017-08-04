import React from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../action_creators'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, withRouter } from 'react-router-dom'

export class NavBarWrapper extends React.PureComponent {
  render() {
    return (
      <NavBar {...this.props} />
    )
  }
}

function mapStateToProps(state) {
  return {
    isDoctor: state.get('isDoctor'),
    loggedIn: state.get('loggedIn')
  }
}

export const NavBarContainer = connect(
  mapStateToProps,
  actionCreators
)(withRouter(NavBarWrapper))

export const NavBar = (props) => {
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
          <LinkContainer to='/search_histories'>
            <NavItem>Search Histories</NavItem>
          </LinkContainer>
        </Nav>
        <Nav pullRight>
          {props.loggedIn === true ?
              <NavDropdown title="My Account" id="basic-nav-dropdown">
                <LinkContainer to='/my_profile'>
                  <MenuItem>Profile</MenuItem>
                </LinkContainer>
                <LinkContainer to='/my_histories'>
                  <MenuItem>Medical Histories</MenuItem>
                </LinkContainer>
                <MenuItem divider />
                <MenuItem onClick={() => {
                  props.logout()
                  props.history.push('/login')
                }}>Log Out</MenuItem>
              </NavDropdown>
            :
              <LinkContainer to='/login'><NavItem>Log In</NavItem></LinkContainer>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
