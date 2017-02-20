import React from 'react';
import {Link} from 'react-router';
import './Navigation.css';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut() {
    this.props.onSignOut().then(
      (success) => {
        alert('You are signed out successfully.');
      }
    );
  }

  render() {
    const wasSignedOut = (
      <div>
        <span><Link to="/user/signup">Sign Up</Link></span>
        <span><Link to="/user/signin">Sign In</Link></span>
      </div>
    );

    const wasSignedIn = (
      <div>
        <span><Link to="/user/:userId/profile">
          Profile: {this.props.status.token.name}
        </Link></span>
        <span><Link to="/post/write">Write</Link></span>
        <a onClick={this.handleSignOut}>SIGN OUT</a>
      </div>
    );

    return(
      <div className="Navigation">
        <span><Link to="/">Home</Link></span>
        {this.props.status.isSignedIn ? wasSignedIn : wasSignedOut}
      </div>
    );
  }
}

Navigation.propTypes = {
  status: React.PropTypes.object,
  onSignOut: React.PropTypes.func,
};

Navigation.defaultProps = {
  status: {
    valid: false,
    isSignedIn: false,
    token: {
      _id: '',
      email: '',
      name: '',
      exp: 0,
    },
  },
  onSignOut: () => {
    console.error('onSignOut not defined');
  },
};

export default Navigation;
