import React from 'react';
import {connect} from 'react-redux';
import {NavigationContainer} from './containers';
import {getStatusRequest, signoutRequest} from './actions/user';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    // get cookie by name
    function getCookie(name) {
      let value = '; ' + document.cookie;
      let parts = value.split('; ' + name + '=');
      if(parts.length == 2) return parts.pop().split(';').shift();
    }

    // get user data from cookie
    let signinData = getCookie('key');

    // if user data is undefined, do nothing
    if(typeof signinData === 'undefined') return;

    // decode base64 & parse json
    signinData = JSON.parse(atob(signinData));

    // if not signed in, do nothing
    if(!signinData.isSignedIn) return;

    // check if the cookie is valid when page refreshed
    this.props.getStatusRequest(this.props.status.token._id).then(() => {
      if(!this.props.status.valid) {
        // if invalid, sign out
        signinData = {
          isSignedIn: false,
          userName: '',
        };
        document.cookie = 'key=' + btoa(JSON.stringify(signinData));
        alert('Your session is expired. Please sign in again.');
      }
    });
  }

  handleSignOut() {
    this.props.signoutRequest().then(() => {
      let signinData = {
        isSignedIn: false,
        userName: '',
      };
      document.cookie = 'key=' + btoa(JSON.stringify(signinData));
    });
    alert('You are signed out successfully.');
  }

  // 리액트 라우터 하위 항목들이 props.children으로 전달된다
  render() {
    return (
      <div>
        <NavigationContainer
          onSignOut={this.handleSignOut}
        />
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.navigation.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStatusRequest: () => {
      return dispatch(getStatusRequest());
    },
    signoutRequest: () => {
      return dispatch(signoutRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
