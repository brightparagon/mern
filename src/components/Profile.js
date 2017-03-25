import React from 'react';
import {
  Button, Card, Icon, Grid,
} from 'semantic-ui-react';

function Profile({token}) {
  const extra = (
    <a>
      <Icon name='user'/>
      16 Friends
    </a>
  );

  let description= `${token.name} is a sound engineer
    living in Nashville who enjoys playing guitar and hanging with his cat.`;

  return (
    <div className="Profile">
      <br/>
      <Grid verticalAlign='middle' centered columns={3}>
        <Grid.Column>
          <Card
            image='/images/elliot.jpg'
            header={token.name}
            meta={token.email}
            description={description}
            extra={extra}
          />
        </Grid.Column>
      </Grid>
    </div>
  );
};

Profile.propTypes = {
  token: React.PropTypes.object,
};

Profile.defaultProps = {
  token: {
    _id: '',
    email: '',
    name: '',
    exp: 0,
  },
};

export default Profile;
