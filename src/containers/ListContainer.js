import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {List} from '../components';
import {
  listPostRequest,
  editPostRequest,
  deletePostRequest,
} from '../actions/post';

class ListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.listPostRequest();
  }

  handleEdit(id, title, contents) {
    this.props.editPostRequest(id, title, contents).then(() => {
      if(this.props.edit.status === 'SUCCESS') {
        alert('Your post is updated successfully.');
      } else {
        alert('An error occured while your post is updated.');
      }
    });
  }

  handleDelete(id) {
    this.props.deletePostRequest(id).then(() => {
      if(this.props.delete.status === 'SUCCESS') {
        alert('Your post is deleted successfully.');
      } else {
        alert('An error occured while your post is deleted.');
      }
    });
  }

  render() {
    return(
      <List
        posts={this.props.list.data}
        currentUser={this.props.currentUser}
        onEdit={this.props.handleEdit}
        onDelete={this.props.handleDelete}
      />
    );
  }
}

const mapStateToProps = (state) => {
  // currentUser는 최상위 컴포넌트에서 내려받는 것이 적절함
  // 일단은 여기서 List Component로 내려보냄
  return {
    list: state.post.list,
    edit: state.post.edit,
    delete: state.post.delete,
    currentUser: state.navigation.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    listPostRequest: () => {
      return dispatch(listPostRequest());
    },
    editPostRequest: (id, title, contents) => {
      return dispatch(editPostRequest(id, title, contents));
    },
    deletePostRequest: (id) => {
      return dispatch(deletePostRequest(id));
    },
  };
};

export default connect(mapStateToProps,
  mapDispatchToProps)(ListContainer);
