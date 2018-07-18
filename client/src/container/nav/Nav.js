import React, { Component } from 'react';

import './temp.css';

import NavConst from './NavConst';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true,
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
      <div class="nav_container">
        <div class="navContainer">
          <NavConst
            name={this.state.name}
            postsAva={this.state.postsAva}
            freeCall={this.state.freeCall}
            credits={this.state.credits}
          />
          <h4 class={open ? 'collapse' : 'collapse_open'} onClick={this.toggle}>
            |||
          </h4>
        </div>
        <div
          class={open ? 'nav_collapse' : 'nav_collapse_open'}
          onClick={this.toggle} // this toggles the auto-close
        >
          <a href="/" class="nav_link">
            <h3> Home </h3>
          </a>
          <a href="/profile" class="nav_link">
            <h3> Profile </h3>
          </a>
          <a href="/matches" class="nav_link">
            <h3> Matches </h3>
          </a>
          <a href="/browse" class="nav_link">
            <h3> Job Postings </h3>
          </a>
          <a href="/billing" class="nav_link">
            <h3> Billing </h3>
          </a>
          <hr />
          <a href="/login" class="nav_link">
            <h3> Sign Out </h3>
          </a>
        </div>
      </div>
    );
  }
}

export default Nav;
