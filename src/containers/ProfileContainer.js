import React from 'react';
import {conntect} from 'react-redux';
import {browserHistory} from 'react-router';
import {Profile} from '../components';

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Profile currentUser={this.props.currentUser}/>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.navigation.status.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps,
  mapDispatchToProps)(ProfileContainer);
