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
        <Link to="/user/signup">Sign Up</Link>
        <Link to="/user/signin">Sign In</Link>
      </div>
    );
  }
}
// <span>Sign Up</span>
export default Navigation;
