import React, { Component } from 'react';

import { SeekerLogin, EmployerLogin } from './';

export default class LandingLogin extends Component {
  constructor() {
    super();
    
    this.state = {
      showMenu: false,
      showSeekerLogin: false,
      showSeekerEmployer: false,
    };
    
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.showSeekerLogin = this.showSeekerLogin.bind(this);
    this.showEmployerLogin = this.showEmployerLogin.bind(this);
  }
  
  showMenu(event) {
    event.preventDefault();
    
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  
  closeMenu(event) {  
    if (!this.dropdownMenu.contains(event.target)) {
      
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });       
    }
  }

  showSeekerLogin(event) {
    event.preventDefault();
    this.setState({ showSeekerLogin: true });
  }

  showEmployerLogin(event) {
    event.preventDefault();
    this.setState({ showEmployerLogin: true });
  }

  render() {
    return (
      <div>
        <button onClick={this.showMenu}>
          Login
        </button>        
        { this.state.showMenu ?
          (
            <div
              className="menu"
              ref={(element) => {
                this.dropdownMenu = element;
              }}
            >
              <button onClick={this.showSeekerLogin}>
                As lob seeker?
              </button>
              <button onClick={this.showEmployerLogin}>
                Or employer?
              </button>
              { this.state.showSeekerLogin ? <SeekerLogin/> : null }
              { this.state.showEmployerLogin ? <EmployerLogin/> : null }
            </div>
          ) : ( null )
        }
      </div>
    );
  }
}
