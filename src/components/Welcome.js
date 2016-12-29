import React from 'react';
import { Link } from 'react-router';

const Welcome = () => {

  return (
    <div>
      Welcome!
      <Link to='/signup'>Signup</Link>
      <Link to='/login'>Login</Link>
    </div>
  );
};

export default Welcome;
