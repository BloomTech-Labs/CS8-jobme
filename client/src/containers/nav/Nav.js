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
            <NavLink href="/">Home</NavLink>
          </NavLinkBox>
          <NavLinkBox>
            <NavLink href="browse">Browse</NavLink>
          </NavLinkBox>
          <NavLinkBox>
            <NavLink href="profile">Profile</NavLink>
          </NavLinkBox>
          <NavLinkBox>
            <NavLink href="matches">Matches</NavLink>
          </NavLinkBox>
          <NavLinkBox>
              <NavLink href="messages">Messages</NavLink>
          </NavLinkBox>
          {localStorage.getItem('employerToken') ? 
            <div>
              <NavLinkBox>
                <NavLink href="uploadjob">Post a Job</NavLink>
              </NavLinkBox>
              <NavLinkBox>
                <NavLink href="jobs">Posted Jobs</NavLink>
              </NavLinkBox>
            </div>
            : <div/>
          }
          <NavLinkBox>
            <NavLink href="billing">Billing</NavLink>
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
