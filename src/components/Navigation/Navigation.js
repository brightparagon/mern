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
        <a><Link to="/signup"> Sign Up </Link></a>
        <a><Link to="/signin"> Sign In </Link></a>
      </div>
    );
  }
}

export default Navigation;
