import React from 'react';
import {Link} from 'react-router';
import {
  Button, Image, Grid, Icon, Label,
  Container, Header, TextArea, Modal,
} from 'semantic-ui-react';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dimmer: '',
      open: false,
    };
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
  }

  show(dimmer) {
    this.setState({
      dimmer: dimmer,
      open: true,
    });
  }

  close() {
    this.setState({
      open: false,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let update = JSON.stringify(this.props) !== JSON.stringify(nextProps);
    return update;
  }

  render() {
    const line = (data) => {
      return data.map((post, i) => {
        return (
          <div>
            <Button onClick={this.show('blurring')}>
              {post.title}
            </Button>
            <br/>
            <br/>
          </div>
        );
      });
    };

    return(
      <div className="List">
        <br/>
        <br/>
        <Container text>
          {line(this.props.posts)}
          <Modal dimmer={this.state.dimmer}
            open={this.state.open} onClose={this.close}>
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
              <Button color='black' onClick={this.close}>
                Nope
              </Button>
              <Button positive icon='checkmark' labelPosition='right'
                content="Yep, that's me" onClick={this.close}/>
            </Modal.Actions>
          </Modal>
        </Container>
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
