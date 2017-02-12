import React from 'react';
import {Navigation} from 'components';
import {connect} from 'react-redux';
import {loginRequest} from 'actions/user';

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
