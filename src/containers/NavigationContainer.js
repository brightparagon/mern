import React from 'react';
import {connect} from 'react-redux';
import {Navigation} from '../components';

class NavigationContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Navigation status={this.props.status}
        onSignOut={this.props.onSignOut}/>
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
