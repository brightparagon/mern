import React from 'react';
import {Link} from 'react-router';
import {
  Button, Input, Grid, Icon, Label,
  Container, Header, TextArea, Form,
} from 'semantic-ui-react';

class Write extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      contents: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleChange(e, {name, value}) {
    let nextState = {};
    nextState[name] = value;
    this.setState(nextState);
  }

  handleUpload() {
    let title = this.state.title;
    let contents = this.state.contents;
    let userId = this.props.userId;
    this.props.onUpload(title, contents, userId);
  }

  render() {
    return(
      <div className="Write">
        <br/>
        <br/>
        <Form>
          <Container text>
            <Form.Input label='Title' fluid name='title' placeholder='title'
              value={this.state.title} onChange={this.handleChange}>
              <input/>
            </Form.Input>
            <Form.TextArea rows='20' name='contents' placeholder='Write here!'
              value={this.state.contents} onChange={this.handleChange}>
              <textarea/>
            </Form.TextArea>
            <br/>
            <Button.Group>
              <Button color='orange' as={Link} to='/'>Cancel</Button>
              <Button.Or/>
              <Button positive onClick={this.handleUpload}>Save</Button>
            </Button.Group>
          </Container>
        </Form>
      </div>
    );
  }
}

Write.propTypes = {
  onUpload: React.PropTypes.func,
  userId: React.PropTypes.string,
};

Write.defaultProps = {
  onUpload: (title, contents) => {
    console.error("onUpload not defined");
  },
  userId: '',
};

export default Write;
