import React from 'react';
import Profile from '../components/Profile/Profile';
import { authInitialProps } from '../lib/auth';

const ProfilePage = (props) => (
  <Profile {...props} />
)

// this must be a protected route
ProfilePage.getInitialProps = authInitialProps(true);

export default ProfilePage;
