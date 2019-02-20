import React from 'react';
import Link from 'next/link';
import CardHeader from "@material-ui/core/CardHeader";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Avatar from "@material-ui/core/Avatar";
import Delete from "@material-ui/icons/Delete";
import withStyles from "@material-ui/core/styles/withStyles";

class Comments extends React.Component {
  state = {
    text: ''
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ text: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { text } = this.state;
    const { postId, handleAddComment } = this.props;

    handleAddComment(postId, text);
    this.setState({ text: '' });
  }

  showComment = (comment) => {
    const { postId, auth, classes, handleDeleteComment } = this.props;
    const isCommentCreator = comment.postedBy._id === auth.user._id;

    return (
      <div data-testid='comment'>
        <Link href={`/profile/${comment.postedBy._id}`}>
          <a className={classes.link}>{comment.postedBy.name}</a>
        </Link>
        <br />
        {comment.text}
        <span className={classes.commentDate}>
          {comment.createdAt}
          {isCommentCreator && (
            <Delete
              data-testid='delete-comment'
              color='secondary'
              className={classes.commentDelete}
              onClick={() => handleDeleteComment(postId, comment)}
            />
          )}
        </span>
      </div>
    );
  }

  render() {
    const { auth, comments, classes } = this.props;
    const { text } = this.state;

    return (
      <div className={classes.comments}>
        {/* Comment Input */}
        <CardHeader
          avatar={
            <Avatar className={classes.smallAvatar} src={auth.user.avatar} />
          }
          title={
            <form onSubmit={this.handleSubmit} data-testid='form'>
              <FormControl margin='normal' required fullWidth>
                <InputLabel htmlFor='add-comment'>Add comments</InputLabel>
                <Input
                  id='add-comment'
                  name='text'
                  placeholder='Something to say?'
                  value={text}
                  onChange={this.handleChange}
                />
              </FormControl>
            </form>
          }
          className={classes.cardHeader}
        />

        {/* Comments */}
        {comments.map(comment => (
          <CardHeader
            key={comment._id}
            avatar={
              <Avatar
                className={classes.smallAvatar}
                src={comment.postedBy.avatar}
              />
            }
            title={this.showComment(comment)}
            className={classes.cardHeader}
          />
        ))}
      </div>
    );
  }
}

const styles = theme => ({
  comments: {
    backgroundColor: 'rgba(11, 61, 130, 0.06)'
  },
  cardHeader: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  smallAvatar: {
    margin: 10
  },
  commentDate: {
    display: 'block',
    color: 'gray',
    fontSize: '0.8em'
  },
  commentDelete: {
    fontSize: '1.6em',
    verticalAlign: 'middle',
    cursor: 'pointer'
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
  }
});

export default withStyles(styles)(Comments);
