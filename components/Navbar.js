import React from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Lens from '@material-ui/icons/Lens';

const Navbar = ({ router, pageProps: { auth } }) => {
  const { user = {} } = auth || {};
  return (
    <AppBar position={router.pathname === '/' ? 'fixed' : 'static'}>
      <Toolbar>
        <Lens />
        <Typography variant='h4' component='h1'>
          Barbelith
        </Typography>

        {user._id ? (
          // Auth navigation
          <div>
            <Button>Profile</Button>
            <Button variant='outlined'>Signout</Button>
          </div>
        ) : (
            // UnAuth navigation
            <div>
              <Button>Signup</Button>
              <Button>Signin</Button>
            </div>
          )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
