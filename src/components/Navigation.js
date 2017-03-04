import React from 'react';
import {Link} from 'react-router';
import {Button, Menu} from 'semantic-ui-react';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.state = {
      activeItem: 'home',
    };
  }

  handleItemClick(e, {name}) {
    this.setState({activeItem: name});
  }

  handleSignOut() {
    this.props.onSignOut();
  }

  render() {
    let {activeItem} = this.state;

    const wasSignedOut = (
      <div>
        <Menu size='large'>
          <Menu.Item name='home' active={activeItem === 'home'} as={Link}
            to='/' onClick={this.handleItemClick}/>

          <Menu.Menu position='right'>
            <Menu.Item as={Link} to='/user/signup'>
              <Button color='olive'>Sign Up</Button>
            </Menu.Item>
            <Menu.Item as={Link} to='/user/signin'>
              <Button color='teal'>Sign In</Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );

    const wasSignedIn = (
      <div>
        <Menu size='small'>
          <Menu.Item name='home' active={activeItem === 'home'} as={Link}
            to='/' onClick={this.handleItemClick}/>
          <Menu.Item name='profile' active={activeItem === 'profile'} as={Link}
            to='/user/:userId/profile' onClick={this.handleItemClick}>
            Profile: {this.props.status.token.name}
          </Menu.Item>
          <Menu.Item name='write' active={activeItem === 'write'} as={Link}
            to='/post/write' onClick={this.handleItemClick}/>

          <Menu.Menu position='right'>
            <Menu.Item onClick={this.handleSignOut}>
              <Button color='pink'>Sign Out</Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );

    return(
      <div className="Navigation">
        {this.props.status.isSignedIn ? wasSignedIn : wasSignedOut}
      </div>
    );
  }
}

Navigation.propTypes = {
  status: React.PropTypes.object,
  onSignOut: React.PropTypes.func,
};

Navigation.defaultProps = {
  status: {
    valid: false,
    isSignedIn: false,
    token: {
      _id: '',
      email: '',
      name: '',
      exp: 0,
    },
  },
  onSignOut: () => {
    console.error('onSignOut not defined');
  },
};

export default Navigation;
