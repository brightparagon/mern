import React from 'react';
import {Link} from 'react-router';
import './Navigation.css';

const Navigation = () => (
  <div className="Navigation">
    <a><Link to="/signup">Sign Up</Link></a>
    <a><Link to="/signin">Sign In</Link></a>
  </div>
);

export default Navigation;
