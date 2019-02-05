import React from 'react';
import { AppBar, Toolbar, Typography, Button, withStyles } from '@material-ui/core';
import Lens from '@material-ui/icons/Lens';

const Navbar = ({ classes, router, pageProps: { auth } }) => {
  const { user = {} } = auth || {};
  return (
    <AppBar
      className={classes.appBar}
      position={router.pathname === '/' ? 'fixed' : 'static'}
      data-testid='navbar'
    >
      <Toolbar>
        <Lens className={classes.icon} />
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
            <Button>Profile</Button>
            <Button variant='outlined'>Sign out</Button>
          </div>
        ) : (
            // UnAuth navigation
            <div>
              <Button>Sign up</Button>
              <Button>Sign in</Button>
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
