import React, { Component } from 'react';

// import './temp.css';

import {NavContainer, Hamburger, NavLinks, NavLinkBox, NavLink } from './navStyles.js';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const currentState = this.state.isOpen;
    this.setState({ isOpen: !currentState });
  }

  render() {
    const menuIsOpen = this.state.isOpen;

    return (
      <NavContainer>
            {/* <h4
              className={MenuIsOpen ? 'collapse_closed' : 'collapse_open'}
              onClick={this.toggle}
            >
              |||
            </h4> */}
          {menuIsOpen ? 
            <Hamburger onClick={this.toggle}>|||</Hamburger>
          : <Hamburger onClick={this.toggle} open>|||</Hamburger>
          }
        {/* <div
          className={open ? 'nav_collapse' : 'nav_collapse_open'}
        > */}
        <NavLinks open={menuIsOpen}>
          <NavLinkBox>
            <NavLink href="profile">Profile</NavLink>
          </NavLinkBox>
          <NavLinkBox>
            <NavLink href="matches">Matches</NavLink>
          </NavLinkBox>
          <NavLinkBox>
              <NavLink href="messages">Messages</NavLink>
          </NavLinkBox>
          <NavLinkBox>
            <NavLink href="jobs">Job Postings</NavLink>
          </NavLinkBox>
          <NavLinkBox>
            <NavLink href="billing">Billing</NavLink>
          </NavLinkBox>
          <hr />
          <NavLinkBox>
            <NavLink href="signout">Sign Out</NavLink>
          </NavLinkBox>
        </NavLinks>
      </NavContainer>
    );
  }
}

export default Nav;
