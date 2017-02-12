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
        <a><Link to="/user/signup"> Sign Up </Link></a>
        <a><Link to="/user/signin"> Sign In </Link></a>
      </div>
    );
  }
}

export default Navigation;
