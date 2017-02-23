import React from 'react';
import {Navigation} from '../components';
import {connect} from 'react-redux';
import {signoutRequest} from '../actions/user';

class NavigationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut() {
    this.props.signoutRequest();
    alert('You are signed out successfully.');
  }

  render() {
    return(
      <Navigation status={this.props.status}
        onSignOut={this.handleSignOut}/>
    );
  }
}

// GET STATE FROM STORE(REDUCERS) AND MATCH IT TO THIS.PROPS
const mapStateToProps = (state) => {
  return {
    status: state.navigation.status,
  };
};

// MATCH DISPATCH FUNCS OF ACTIONS TO THIS.PROPS
const mapDispatchToProps = (dispatch) => {
  return {
    signoutRequest: () => {
      return dispatch(signoutRequest());
    },
  };
};

export default connect(mapStateToProps,
  mapDispatchToProps)(NavigationContainer);
