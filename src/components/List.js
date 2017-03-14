import React from 'react';
import {Link} from 'react-router';
import {
  Button, Label, Container,
  Header, Modal, Image,
} from 'semantic-ui-react';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dimmer: 'blurring',
      open: false,
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleShow() {
    this.setState({
      open: true,
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
    const buttons = this.props.posts.map((post, i) =>
      <div>
        <br/>
        <Button color='green' key={i} onClick={this.handleShow}>
          {post.title}
        </Button>
      </div>
    );

    return(
      <div className="List">
        <br/>
        <br/>
        <Container text>
          {buttons}
        </Container>

        <Modal dimmer={this.state.dimmer} open={this.state.open}
          onClose={() => this.handleClose()}>
          <Modal.Header>Select a Photo</Modal.Header>
          <Modal.Content image>
            <Image wrapped size='medium'
              src='http://semantic-ui.com/images/avatar2/large/rachel.png'/>
            <Modal.Description>
              <Header>Default Profile Image</Header>
              <p>Is it okay to use this photo?</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={() => this.handleClose()}>
              Nope
            </Button>
            <Button positive icon='checkmark' labelPosition='right'
              content="Yep, that's me" onClick={() => this.handleClose()}/>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

List.propTypes = {
  posts: React.PropTypes.array,
};

List.defaultProps = {
  posts: [],
};

export default List;
