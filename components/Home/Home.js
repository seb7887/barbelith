import React from 'react';
import Router from 'next/router';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import withStyles from '@material-ui/core/styles/withStyles';

import PostFeed from './PostFeed';
import UserFeed from './UserFeed';

const Home = ({ classes, auth }) => {
  const { user = {} } = auth || {};
  return (
    <main className={classes.root} data-testid='home'>
      {user && user._id ? (
        // Auth User Page
        <Grid container>
          <Grid item xs={12} sm={12} md={7}>
            <PostFeed auth={auth} />
          </Grid>
          <Grid item className={classes.drawerContainer}>
            <Drawer
              className={classes.drawer}
              variant='permanent'
              anchor='right'
              classes={{
                paper: classes.drawerPaper
              }}
            >
              <UserFeed auth={auth} />
            </Drawer>
          </Grid>
        </Grid>
      ) : (
          // Splash Page (UnAuth Page)
          <Grid
            justify='center'
            alignItems='center'
            direction='row'
            container
            className={classes.heroContent}
          >
            <Typography
              component='h1'
              variant='h2'
              align='center'
              color='textPrimary'
              gutterBottom
            >
              An Invisible Social Network
            </Typography>
            <Typography
              variant='h6'
              align='center'
              color='textSecondary'
              component='p'
            >
              Say you want a revolution?
            </Typography>
            <Fab
              className={classes.fabButton}
              variant='extended'
              color='primary'
              onClick={() => Router.push('/signup')}
            >
              Get Started
            </Fab>
          </Grid>
        )}
    </main>
  );
}

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 10,
    paddignLeft: theme.spacing.unit * 5,
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing.unit * 5
    }
  },
  progressContainer: {
    height: '80vh'
  },
  progress: {
    margin: theme.spacing.unit * 2,
    color: theme.palette.secondary.light
  },
  drawerContainer: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  drawer: {
    width: 350
  },
  drawerPaper: {
    marginTop: 70,
    width: 350
  },
  fabButton: {
    margin: theme.spacing.unit * 3,
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.primary.light
  },
  heroContent: {
    maxWidth: 600,
    paddingTop: theme.spacing.unit * 8,
    paddignBottom: theme.spacing.unit * 6,
    margin: '0 auto'
  }
});

export default withStyles(styles)(Home);
