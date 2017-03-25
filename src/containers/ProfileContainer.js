import React from 'react';
import {connect} from 'react-redux';
import {Profile} from '../components';

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Profile token={this.props.token}/>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    token: state.navigation.status.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps,
  mapDispatchToProps)(ProfileContainer);
