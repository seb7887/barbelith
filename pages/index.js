import React from 'react';
import Home from '../components/Home/Home';
import { authInitialProps } from '../lib/auth';

const Index = (props) => (
  <Home {...props} />
)

Index.getInitialProps = authInitialProps();

export default Index;
