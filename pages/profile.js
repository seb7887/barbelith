import React from 'react';
import { authInitialProps } from '../lib/auth';

const ProfilePage = () => (
  <h1>Profile Page</h1>
)

// this must be a protected route
ProfilePage.getInitialProps = authInitialProps(true);

export default ProfilePage;
