import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {NavContainer, Hamburger, NavLinks, NavLinkBox, NavLink, Button } from './navStyles.js';

import { logoutUser } from '../../actions';

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
    this.props.logoutUser();
  }

  render() {
    const menuIsOpen = this.state.isOpen;

    return (
      <NavContainer>
        {menuIsOpen 
          ? <Hamburger onClick={this.toggle}>|||</Hamburger>
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
          {localStorage.getItem('employerToken') 
            ? <div>
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

export default withRouter(connect(null, { logoutUser })(Nav));