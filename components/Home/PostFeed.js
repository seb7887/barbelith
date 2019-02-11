import React from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { getPostFeed, addPost } from '../../lib/api';

import NewPost from './NewPost';
import Post from './Post';

class PostFeed extends React.Component {
  state = {
    posts: [],
    text: '',
    image: '',
    isAddingPost: false,
    isDeletingPost: false
  };

  componentDidMount() {
    this.postData = new FormData();
    this.getPosts();
  }

  getPosts = () => {
    const { auth } = this.props;
    getPostFeed(auth.user._id)
      .then(posts => this.setState({ posts }));
  }

  handleChange = (e) => {
    e.preventDefault();
    let inputValue;

    // if target is an image
    if (e.target.name === 'image') {
      inputValue = e.target.files[0];
    } else {
      inputValue = e.target.value;
    }
    this.postData.set(e.target.name, inputValue);
    this.setState({ [e.target.name]: inputValue });
  }

  handleAddPost = () => {
    const { auth } = this.props;

    this.setState({ isAddingPost: true });
    addPost(auth.user._id, this.postData)
      .then(postData => {
        // add new post to the state's posts array
        const updatedPosts = [postData, ...this.state.posts];
        this.setState({
          posts: updatedPosts,
          isAddingPost: false,
          text: '',
          image: ''
        });
        this.postData.delete('image');
      })
      .catch(err => {
        this.setState({ isAddingPost: false });
      });
  }

  render() {
    const { classes, auth } = this.props;
    const { posts, text, image, isAddingPost, isDeletingPost } = this.state;

    return (
      <div className={classes.root}>
        <Typography
          variant='h4'
          component='h1'
          align='center'
          color='secondary'
          className={classes.title}
        >
          Post Feed
        </Typography>
        <NewPost
          auth={auth}
          text={text}
          image={image}
          isAddingPost={isAddingPost}
          handleChange={this.handleChange}
          handleAddPost={this.handleAddPost}
        />
        {posts.map(post => (
          <Post
            key={post._id}
            auth={auth}
            post={post}
            isDeletingPost={isDeletingPost}
          />
        ))}
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    paddingBottom: theme.spacing.unit * 2
  },
  title: {
    padding: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(PostFeed);
