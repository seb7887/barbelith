import React from 'react';
import { AppBar, Toolbar, Typography, Button, withStyles } from '@material-ui/core';
import Lens from '@material-ui/icons/Lens';
import ActiveLink from '../ActiveLink/ActiveLink';
import { signoutUser } from '../../lib/auth';

const Navbar = ({ classes, router, pageProps: { auth } }) => {
  const { user = {} } = auth || {};

  return (
    <AppBar
      className={classes.appBar}
      position={router.pathname === '/' ? 'fixed' : 'static'}
      data-testid='navbar'
    >
      <Toolbar>
        <ActiveLink href='/'>
          <Lens className={classes.icon} />
        </ActiveLink>

        <Typography
          variant='h4'
          component='h1'
          className={classes.toolbarTitle}
        >
          Barbelith
        </Typography>

        {user._id ? (
          // Auth navigation
          <div>
            <Button>
              <ActiveLink href={`/profile/${user._id}`}>
                Profile
              </ActiveLink>
            </Button>
            <Button
              data-testid='signout-button'
              onClick={signoutUser}
              variant='outlined'
            >
              Sign out
            </Button>
          </div>
        ) : (
            // UnAuth navigation
            <div>
              <Button data-testid='signup-button'>
                <ActiveLink href='/signup'>
                  Sign up
                </ActiveLink>
              </Button>
              <Button data-testid='signin-button'>
                <ActiveLink href='/signin'>
                  Sign in
                </ActiveLink>
              </Button>
            </div>
          )}
      </Toolbar>
    </AppBar>
  );
}

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  toolbarTitle: {
    flex: 1,
    fontWeight: 'bold'
  },
  icon: {
    marginRight: theme.spacing.unit,
  }
});

export default withStyles(styles)(Navbar);
