import React, { Component } from 'react';

import './temp.css';

import NavConst from './NavConst';

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

  render() {
    const open = this.state.isOpen;
    return (
      <div className="nav_container">
        <div className="cont">
          <div className="navContainer">
            <h4
              className={open ? 'collapse_closed' : 'collapse_open'}
              onClick={this.toggle}
            >
              |||
            </h4>
          </div>
        </div>
        <div
          className={open ? 'nav_collapse' : 'nav_collapse_open'}
          // onClick={this.toggle} // this toggles the auto-close
        >
          <a href="#" className="navLink">
            <h3> Profile </h3>
          </a>
          <a href="#" className="navLink">
            <h3> Matches </h3>
          </a>
          <a href="#" className="navLink">
            <h3> Messages </h3>
          </a>

          <a href="#" className="navLink">
            <h3>Job Postings </h3>
          </a>
          <a href="#" className="navLink">
            <h3> Billing </h3>
          </a>

          <hr />
          <a href="#" className="navLink">
            <h3> Sign Out </h3>
          </a>
        </div>
      </div>
    );
  }
}

export default Nav;
