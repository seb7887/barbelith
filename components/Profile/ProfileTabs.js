import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Post from '../Home/Post';
import FollowTab from './FollowTab';

const TabContainer = ({ children }) => (
  <Typography component='div' style={{ padding: '1em' }}>
    {children}
  </Typography>
)

class ProfileTabs extends React.Component {
  state = {
    tab: 0
  };

  handleTabChange = (e, value) => {
    e.preventDefault();
    this.setState({ tab: value });
  }

  render() {
    const { tab } = this.state;
    const {
      auth,
      posts,
      user,
      isDeletingPost,
      handleDeletePost,
      handleToggleLike,
      handleAddComment,
      handleDeleteComment
    } = this.props;

    return (
      <div>
        <AppBar position='static' color='default'>
          <Tabs
            value={tab}
            onChange={this.handleTabChange}
            indicatorColor='secondary'
            textColor='secondary'
            variant='fullWidth'
          >
            <Tab label='Posts' data-testid='tab1' />
            <Tab label='Following' data-testid='tab2' />
            <Tab label='Followers' data-testid='tab3' />
          </Tabs>
        </AppBar>
        {tab === 0 && (
          <TabContainer>
            {posts.map(post => (
              <Post
                key={post._id}
                auth={auth}
                post={post}
                isDeletingPost={isDeletingPost}
                handleDeletePost={handleDeletePost}
                handleToggleLike={handleToggleLike}
                handleAddComment={handleAddComment}
                handleDeleteComment={handleDeleteComment}
              />
            ))}
          </TabContainer>
        )}
        {tab === 1 && (
          <TabContainer>
            <FollowTab users={user.following} />
          </TabContainer>
        )}
        {tab === 2 && (
          <TabContainer>
            <FollowTab users={user.followers} />
          </TabContainer>
        )}
      </div>
    );
  }
}

export default ProfileTabs;