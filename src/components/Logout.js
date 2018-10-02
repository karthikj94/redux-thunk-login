import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../redux/action';

class Logout extends Component {
  logout = (e) => {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    return (
        <button type="submit" value="Logout" onClick={this.logout}>Logout</button>
    )
  }
}

export default connect(null, { logout })(Logout);
