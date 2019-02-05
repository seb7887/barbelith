import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

const Index = () => (
  <h1>Hello World</h1>
)

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
    margin: theme.spacing.unit * 3
  },
  heroContent: {
    maxWidth: 600,
    paddingTop: theme.spacing.unit * 8,
    paddignBottom: theme.spacing.unit * 6,
    margin: '0 auto'
  }
});

export default withStyles(styles)(Index);
