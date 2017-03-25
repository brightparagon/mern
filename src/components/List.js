import React from 'react';
import {Link} from 'react-router';
import {
  Button, Container, Input,
  Header, Modal, Grid,
} from 'semantic-ui-react';
import {Post} from './';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      editMode: false,
      ownership: false,
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
      index: 0,
      title: '',
      contents: '',
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditView = this.handleEditView.bind(this);
    this.handleEditCancel = this.handleEditCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  handleChange(e, {name, value}) {
    let nextState = {};
    nextState[name] = value;
    this.setState(nextState);
  }

  handleEditCancel() {
    this.setState({
      editMode: false,
    });
  }

  handleEditView() {
    this.setState({
      editMode: true,
    });
  }

  handleEdit() {
    let id = this.state.post._id;
    let title = this.state.title;
    let contents = this.state.contents;
    let index = this.state.index;

    this.props.onEdit(id, title, contents, index).then((success) => {
      if(success) {
        this.setState({
          editMode: false,
        });
      }
    });
  }

  handleDelete() {
    let id = this.state.post._id;
    this.props.onDelete(id).then((success) => {
      if(success) {
        this.setState({
          editMode: false,
          open: false,
        });
      }
    });
  }

  handleShow(post, index) {
    this.setState({
      open: true,
      post: post,
      index: index,
      ownership: this.props.currentUser._id === post.author._id,
      title: post.title,
      contents: post.contents,
    });
  }

  handleClose() {
    this.setState({
      open: false,
      editMode: false,
    });
  }

  render() {
    const buttonsOwned = (
      <div>
        <Button color='black' content='Edit' onClick={this.handleEditView}/>
        <Button negative content='Delete' onClick={this.handleDelete}/>
        <Button positive icon='checkmark' labelPosition='right'
          content='Close' onClick={this.handleClose}/>
      </div>
    );

    const postView = (
      <Modal size='small' dimmer='blurring' open={this.state.open}
        onClose={this.handleClose}>
        <Modal.Header>
          {this.state.title}
        </Modal.Header>
        <Modal.Content>
          <p>{this.state.contents}</p>
        </Modal.Content>
        <Modal.Actions>
          {this.state.ownership ? buttonsOwned :
            <Button positive icon='checkmark' labelPosition='right'
            content='Close' onClick={this.handleClose}/>}
        </Modal.Actions>
      </Modal>
    );

    const editView = (
      <Modal size='small' dimmer='blurring' open={this.state.open}
        onClose={this.handleClose}>
        <Modal.Header>
          <Input placeholder='Title'
            value={this.state.title} name='title'
            onChange={this.handleChange}>
          </Input>
        </Modal.Header>
        <Modal.Content>
          <Input placeholder='Contents'
            value={this.state.contents} name='contents'
            onChange={this.handleChange}>
            <input/>
          </Input>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' content='Edit' onClick={this.handleEdit}/>
          <Button negative content='Cancel' onClick={this.handleEditCancel}/>
          <Button positive icon='checkmark' labelPosition='right'
            content='Close' onClick={this.handleClose}/>
        </Modal.Actions>
      </Modal>
    );

    const posts = this.props.posts.map((post, i) =>
      <div>
        <br/>
        <Post key={post._id} index={i} data={post} onShow={this.handleShow}/>
      </div>
    );

    return(
      <div className="List">
        <br/>
        <br/>
        <Grid verticalAlign='middle' centered columns={5}>
          <Grid.Column>
            {posts}
          </Grid.Column>
        </Grid>
        {this.state.editMode ? editView : postView}
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
  onEdit: (id, title, contents, index) => {
    console.log('onEdit not defined');
  },
  onDelete: (id) => {
    console.log('onDelete not defined');
  },
};

export default List;
