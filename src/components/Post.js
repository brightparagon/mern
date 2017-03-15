import React from 'react';
import {
  Button,
} from 'semantic-ui-react';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
  }

  handleShow() {
    // Parent로 object 전달 가능, 효율적인진 의문
    this.props.onShow(this.props.data);
  }

  render() {
    return(
      <div className="List">
        <Button color='green' onClick={this.handleShow}>
          {this.props.data.title}
        </Button>
      </div>
    );
  }
}

Post.propTypes = {
  data: React.PropTypes.object,
  onShow: React.PropTypes.func,
};

Post.defaultProps = {
  data: {
    _id: 'id012345',
    title: 'title',
    contents: 'contents',
    author: {
      _id: 'id012345',
      name: 'name',
      email: 'email',
    },
  },
  onShow: () => {
    console.log('onShow not defined');
  },
};

export default Post;
