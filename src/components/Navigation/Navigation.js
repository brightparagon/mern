import React from 'react';
import './Navigation.css';

const Navigation = () => (
  <div className="Navigation">
    <Button
      color="teal"
      content="Sign Up"
      // onClick={
      //   () => onClick('SIGNUP')
      // }
    />
    <Button
      color="teal"
      content="Sign In"
      // onClick={
      //   () => onClick('SIGNIN')
      // }
    />
  </div>
);

export default Navigation;
