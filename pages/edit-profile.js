import React from 'react';
import { authInitialProps } from '../lib/auth';
import EditProfile from '../components/EditProfile/EditProfile';

const EditProfilePage = (props) => (
  <EditProfile {...props} />
)

// this must be a protected route
EditProfilePage.getInitialProps = authInitialProps(true);

export default EditProfilePage;