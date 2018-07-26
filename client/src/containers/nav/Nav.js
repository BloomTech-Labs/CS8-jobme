import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './temp.css';

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

  logout() {
    localStorage.clear(); // localstorage is per domain, so this is safe
    this.props.history.push('/'); // go to home because what else would you do
    window.location.reload(); // refresh and completely ditch state
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
            <h3 onClick={ () => this.logout() } > Sign Out </h3>
          </a>
        </div>
      </div>
    );
  }
}

export default withRouter(Nav);
