import React from 'react';
import {Link} from 'react-router';
import {
  Button, Label, Container,
  Header, Modal, Image,
} from 'semantic-ui-react';
import {Post} from './';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dimmer: 'blurring',
      open: false,
      editMode: false,
      post: {
        _id: '',
        title: '',
        contents: '',
        author: {
          _id: '',
          name: '',
          email: '',
        },
      },
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditView = this.handleEditView.bind(this);
  }

  handleEditView() {

  }

  handleEdit() {
    if(this.state.editMode) {
      const id = this.state.post._id;
      let title = this.state.post.title;
      let contents = this.state.post.contents;

      this.props.onEdit(id, title, contents).then(() => {
        this.setState({
          editMode: !this.state.editMode,
        });
      });
    } else {
      this.setState({
        editMode: !this.state.editMode,
      });
    }
  }

  handleDelete() {
    const id = this.state.post._id;
    this.props.onDelete(id);
  }

  handleShow(post) {
    this.setState({
      open: true,
      post: post,
    });
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
      return true;
    }
    if(JSON.stringify(this.state) !== JSON.stringify(nextState)) {
      return true;
    }
    return false;
  }

  render() {
    const ownership =
      this.props.currentUser._id === this.state.post.author._id ? true : false;

    const editButton = (
      <Button color='green' onClick={this.handleEdit}>
        Edit
      </Button>
    );

    const buttonsOwned = (
      <div>
        <Button color='black' onClick={this.handleEditView}>
          Edit
        </Button>
        <Button color='red' onClick={this.handleDelete}>
          Delete
        </Button>
      </div>
    );

    const posts = this.props.posts.map((post) =>
      <div>
        <br/>
        <Post key={post._id} data={post} onShow={this.handleShow}/>
      </div>
    );

    return(
      <div className="List">
        <br/>
        <br/>
        <Container text>
          {posts}
        </Container>

        <Modal dimmer={this.state.dimmer} open={this.state.open}
          onClose={this.handleClose}>
          <Modal.Header>{this.state.post.author.name}</Modal.Header>
          <Modal.Content image>
            <Image wrapped size='medium'
              src='http://semantic-ui.com/images/avatar2/large/rachel.png'/>
            <Modal.Description>
              <Header>{this.state.post.title}</Header>
              <p>{this.state.post.contents}</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            {ownership ? buttonsOwned : undefined}
            {this.state.editMode ? editButton : undefined}
            <Button positive icon='checkmark' labelPosition='right'
              content="Close" onClick={this.handleClose}/>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

List.propTypes = {
  posts: React.PropTypes.array,
  currentUser: React.PropTypes.object,
  onEdit: React.PropTypes.func,
  onDelete: React.PropTypes.func,
};

List.defaultProps = {
  posts: [],
  currentUser: {
    _id: '',
    email: '',
    name: '',
  },
  onEdit: (id, title, contents) => {
    console.log('onEdit not defined');
  },
  onDelete: (id) => {
    console.log('onDelete not defined');
  },
};

export default List;
