import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {List} from '../components';
// import {viewPostRequest} from '../actions/post';

class ListContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <List posts={this.props.posts}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.post.list.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps,
  mapDispatchToProps)(ListContainer);
