import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {Write} from '../components';
import {createPostRequest} from '../actions/post';

class PostCreateContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload(title, contents, userId) {
    return this.props.createPostRequest(title, contents, userId).then(
      () => {
        if(this.props.post.status === 'SUCCESS') {
          alert('Your post is saved successfully.');
          browserHistory.push('/');
          return true;
        } else {
          alert('Save Fail: ' + this.props.post.failReason);
          return false;
        }
      }
    );
  }

  render() {
    return(
      <Write onUpload={this.handleUpload}
        userId={this.props.token._id}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.post.post,
    token: state.navigation.status.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPostRequest: (title, contents, userId) => {
      return dispatch(createPostRequest(title, contents, userId));
    },
  };
};

export default connect(mapStateToProps,
  mapDispatchToProps)(PostCreateContainer);
