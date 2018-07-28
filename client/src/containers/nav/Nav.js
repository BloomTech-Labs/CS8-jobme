import React, { Component } from 'react';
import {NavContainer, Hamburger, NavLinks, NavLinkBox, NavLink, Button } from './navStyles.js';
import { withRouter } from 'react-router-dom';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const currentState = this.state.isOpen;
    this.setState({ isOpen: !currentState });
  }

  logout() {
    localStorage.clear(); // localstorage is per domain, so this is safe
    this.props.history.push('/'); // go to home because what else would you do
    window.location.reload(); // refresh and completely ditch state
  }

  render() {
    const menuIsOpen = this.state.isOpen;

    return (
      <NavContainer>
        {menuIsOpen ? 
          <Hamburger onClick={this.toggle}>|||</Hamburger>
        : <Hamburger onClick={this.toggle} open>|||</Hamburger>
        }
        <NavLinks open={menuIsOpen}>
          <NavLinkBox>
            <NavLink to="/">Home</NavLink>
          </NavLinkBox>
          <NavLinkBox>
            <NavLink to="browse">Browse</NavLink>
          </NavLinkBox>
          <NavLinkBox>
            <NavLink to="profile">Profile</NavLink>
          </NavLinkBox>
          <NavLinkBox>
            <NavLink to="matches">Matches</NavLink>
          </NavLinkBox>
          <NavLinkBox>
              <NavLink to="messages">Messages</NavLink>
          </NavLinkBox>
          {localStorage.getItem('employerToken') ? 
            <div>
              <NavLinkBox>
                <NavLink to="uploadjob">Post a Job</NavLink>
              </NavLinkBox>
              <NavLinkBox>
                <NavLink to="jobs">Posted Jobs</NavLink>
              </NavLinkBox>
            </div>
            : <div/>
          }
          <NavLinkBox>
            <NavLink to="billing">Billing</NavLink>
          </NavLinkBox>
          <NavLinkBox>
            <Button onClick={ () => this.logout() }>Sign Out</Button>
          </NavLinkBox>
        </NavLinks>
      </NavContainer>
    );
  }
}

export default withRouter(Nav);
