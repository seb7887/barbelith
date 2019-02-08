import Button from '@material-ui/core/Button';
import { followUser, unfollowUser } from '../../lib/api';

const FollowUser = ({ isFollowing, toggleFollow }) => {
  const request = isFollowing ? unfollowUser : followUser;

  return (
    <Button
      data-testid='button'
      variant='contained'
      color={isFollowing ? 'primary' : 'secondary'}
      onClick={() => toggleFollow(request)}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
}

export default FollowUser;
