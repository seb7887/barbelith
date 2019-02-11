import React from 'react';
import Router from 'next/router';
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Snackbar from "@material-ui/core/Snackbar";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import VerifiedUserTwoTone from "@material-ui/icons/VerifiedUserTwoTone";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CloudUpload from "@material-ui/icons/CloudUpload";
import FaceTwoTone from "@material-ui/icons/FaceTwoTone";
import EditSharp from "@material-ui/icons/EditSharp";
import withStyles from "@material-ui/core/styles/withStyles";

import { getAuthUser, updateUser } from '../../lib/api';

class EditProfile extends React.Component {
  state = {
    _id: '',
    name: '',
    email: '',
    about: '',
    avatar: '',
    avatarPreview: '',
    openSuccess: false,
    openError: false,
    error: '',
    updatedUser: null,
    isSaving: false,
    isLoading: true
  };

  componentDidMount() {
    const { auth } = this.props;

    this.userData = new FormData();
    getAuthUser(auth.user._id)
      .then(user => {
        this.setState({
          ...user,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({ isLoading: false });
      });
  }

  handleChange = (e) => {
    e.preventDefault();
    let inputValue;

    // check if it is an image
    if (e.target.name === 'avatar') {
      inputValue = e.target.files[0];
      this.setState({
        avatarPreview: this.createPreviewImage(inputValue)
      });
    } else {
      inputValue = e.target.value;
    }

    this.userData.set(e.target.name, inputValue);
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ isSaving: true });
    updateUser(this.state._id, this.userData)
      .then(updatedUser => {
        this.setState({ updateUser, openSuccess: true }, () => {
          setTimeout(() => Router.push(`/profile/${this.state._id}`), 3000);
        });
      })
      .catch(this.showError);
  }

  createPreviewImage = (file) => URL.createObjectURL(file);

  handleClose = () => this.setState({ openError: false });

  showError = (err) => {
    const error = (err.response && err.response.data) || err.message;
    this.setState({ error, openError: true, isSaving: false });
  }

  render() {
    const { classes } = this.props;
    const {
      name,
      email,
      avatar,
      about,
      avatarPreview,
      isLoading,
      isSaving,
      updatedUser,
      openSuccess,
      openError,
      error
    } = this.state;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <EditSharp />
          </Avatar>
          <Typography variant='h5' component='h1'>
            Edit Profile
          </Typography>

          {/* Edit Profile Form */}
          <form onSubmit={this.handleSubmit} className={classes.form}>
            {isLoading ? (
              <Avatar className={classes.bigAvatar}>
                <FaceTwoTone />
              </Avatar>
            ) : (
                <Avatar
                  data-testid='big-avatar'
                  src={avatarPreview || avatar}
                  className={classes.bigAvatar}
                />
              )}
            <input
              data-testid='avatar'
              type='file'
              name='avatar'
              id='avatar'
              accept='image/*'
              onChange={this.handleChange}
              className={classes.input}
            />
            <label htmlFor='avatar' className={classes.uploadButton}>
              <Button variant='contained' color='secondary' component='span'>
                Upload Image <CloudUpload />
              </Button>
            </label>
            <span className={classes.filename}>
              {avatar && avatar.name}
            </span>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='name'>Name</InputLabel>
              <Input
                id='name'
                type='text'
                name='name'
                value={name}
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='about'>About</InputLabel>
              <Input
                id='about'
                type='text'
                name='about'
                value={about}
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='email'>Email</InputLabel>
              <Input
                id='email'
                type='email'
                name='email'
                value={email}
                onChange={this.handleChange}
              />
            </FormControl>
            <Button
              data-testid='submit'
              type='submit'
              fullWidth
              disabled={isSaving || isLoading}
              variant='contained'
              color='secondary'
              className={classes.submit}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </form>
        </Paper>

        {/* Error Snackbar */}
        {error && (
          <Snackbar
            data-testid='error'
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            open={openError}
            onClose={this.handleClose}
            autoHideDuration={6000}
            message={<span className={classes.snack}>{error}</span>}
          />
        )}

        {/* Success Dialog */}
        <Dialog data-testid='success' open={openSuccess} disableBackdropClick={true}>
          <DialogTitle>
            <VerifiedUserTwoTone className={classes.icon} />
            Profile Updated
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              User {updatedUser && updatedUser.name} was successfully updated!
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up('md')]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  uploadButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0.25em'
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing.unit * 2
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 2
  },
  snack: {
    color: theme.palette.secondary.light
  },
  icon: {
    padding: '0px 2px 2px 0px',
    verticalAlign: 'middle',
    color: 'green'
  },
  input: {
    display: 'none'
  }
});

export default withStyles(styles)(EditProfile);
