import React from 'react';
import {Navigation} from '../components';
import {connect} from 'react-redux';
import {signoutRequest} from '../actions/user';

class NavigationContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Navigation />
    );
  }
}

// GET STATE FROM STORE(REDUCERS) AND MATCH IT TO THIS.PROPS
const mapStateToProps = (state) => {
  return {
    status: state.navigation.signin.status,
  };
};

// NOT USED HERE YET
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
