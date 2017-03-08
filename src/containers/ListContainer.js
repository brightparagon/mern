import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {List} from '../components';
import {listPostRequest} from '../actions/post';

class ListContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.listPostRequest();
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
    listPostRequest: () => {
      return dispatch(listPostRequest());
    },
  };
};

export default connect(mapStateToProps,
  mapDispatchToProps)(ListContainer);
