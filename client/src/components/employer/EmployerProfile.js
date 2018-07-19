import React, { Component } from 'react';


export default class EmployerProfile extends Component {
  render() {
    return (
      <div>
        <div>
          <img src='http://via.placeholder.com/150x150' /><h2>{this.props.name}</h2>
        </div>
      </div>
    );
  }
}
