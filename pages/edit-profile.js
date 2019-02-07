import React from 'react';
import { authInitialProps } from '../lib/auth';

const EditProfile = () => (
  <h1>Edit Profile</h1>
)

// this must be a protected route
EditProfile.getInitialProps = authInitialProps(true);

export default EditProfile;