import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {NavContainer, Hamburger, NavLinks, NavLinkBox, NavLink, Button } from './navStyles';

import { logoutUser } from '../../actions';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      menuItemSelected: "home"
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const currentState = this.state.isOpen;
    this.setState({ isOpen: !currentState });
  }

  select(menuItem) {
    this.setState({ menuItemSelected: menuItem });
  }

  logout() {
    this.props.logoutUser();
  }

  render() {
    const menuIsOpen = this.state.isOpen;
    if (this.props.isLoggedIn) {
      return (
        <NavContainer>
          {menuIsOpen 
            ? <Hamburger onClick={this.toggle}>|||</Hamburger>
            : <Hamburger onClick={this.toggle} open>|||</Hamburger>
          }
          <NavLinks open={menuIsOpen}>
            <NavLink to="/">
              <NavLinkBox
                onClick={this.select.bind(this, "home")}
                selected={this.state.menuItemSelected === "home"}
              >
                Home
              </NavLinkBox>
            </NavLink>
            <NavLink to="/profile">
              <NavLinkBox
                onClick={this.select.bind(this, "profile")}
                selected={this.state.menuItemSelected === "profile"}
              >
                Profile
              </NavLinkBox>
            </NavLink>
            <NavLink to="/matches">
              <NavLinkBox
                onClick={this.select.bind(this, "matches")}
                selected={this.state.menuItemSelected === "matches"}
              >
                Matches
              </NavLinkBox>
            </NavLink>
            <NavLink to="/messages">
              <NavLinkBox
                onClick={this.select.bind(this, "messages")}
                selected={this.state.menuItemSelected === "messages"}
              >
                  Messages
              </NavLinkBox>
            </NavLink>
            {this.props.profile.userType === 'employer' ?
            <div>
              <NavLink to="/uploadjob">
                <NavLinkBox
                  onClick={this.select.bind(this, "uploadjob")}
                  selected={this.state.menuItemSelected === "uploadjob"}
                >
                  Post a Job
                </NavLinkBox>
              </NavLink>
              <NavLink to="/jobs">
                <NavLinkBox
                  onClick={this.select.bind(this, "jobs")}
                  selected={this.state.menuItemSelected === "jobs"}
                >
                  Posted Jobs
                </NavLinkBox>
              </NavLink>
            </div>
            : <div/>
            }
            <NavLink to="/billing">
              <NavLinkBox
                onClick={this.select.bind(this, "billing")}
                selected={this.state.menuItemSelected === "billing"}
              >
                Billing
              </NavLinkBox>
            </NavLink>
            <Button onClick={ () => this.logout() }>Sign Out</Button>
          </NavLinks>
        </NavContainer>
      );
    } return <div/>;
  } 
}

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
    isLoggedIn: state.user.isLoggedIn,
  }
}

export default withRouter(connect(mapStateToProps, { logoutUser })(Nav));
