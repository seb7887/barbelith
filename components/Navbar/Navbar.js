import React from 'react';
import { AppBar, Toolbar, Typography, Button, withStyles } from '@material-ui/core';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import Lens from '@material-ui/icons/Lens';


const Navbar = ({ classes, router, pageProps: { auth } }) => {
  const { user = {} } = auth || {};
  return (
    <AppBar
      className={classes.appBar}
      position={router.pathname === '/' ? 'fixed' : 'static'}
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
    color: theme.palette.favoriteIcon.light
  }
});

export default withStyles(styles)(Navbar);
