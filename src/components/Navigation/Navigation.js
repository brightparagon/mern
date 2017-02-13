import React from 'react';
import {Link} from 'react-router';
import './Navigation.css';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="Navigation">
        <span><Link to="/user/signup">Sign Up</Link></span>
        <span><Link to="/user/signin">Sign In</Link></span>
      </div>
    );
  }
}

export default Navigation;
