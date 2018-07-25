import React, { Component } from 'react';

import './temp.css';

import NavConst from './NavConst';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      name: ['Kevin'],
      postsAva: ['1'],
      freeCall: ['3'],
      credits: ['20'],
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
        <div className="navContainer">
          <NavConst
            name={this.state.name}
            postsAva={this.state.postsAva}
            freeCall={this.state.freeCall}
            credits={this.state.credits}
          />
          <h4 className={open ? 'collapse_open' : 'collapse'} onClick={this.toggle}>
            |||
          </h4>
        </div>
        <div
          className={open ? 'nav_collapse' : 'nav_collapse_open'}
          onClick={this.toggle} // this toggles the auto-close
        >
          <a href="/" className="nav_link">
            <h3> Home </h3>
          </a>
          <a href="/profile" className="nav_link">
            <h3> Profile </h3>
          </a>
          <a href="/matches" className="nav_link">
            <h3> Matches </h3>
          </a>
          <a href="/browse" className="nav_link">
            <h3> Job Postings </h3>
          </a>
          <a href="/billing" className="nav_link">
            <h3> Billing </h3>
          </a>
          <hr />
          <a href="/login" className="nav_link">
            <h3> Sign Out </h3>
          </a>
        </div>
      </div>
    );
  }
}

export default Nav;
