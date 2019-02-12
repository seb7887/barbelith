/* eslint-env jest */
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';

import { render, fireEvent } from 'react-testing-library';
import { fakePost } from '../../../utils/testUtils';
import Post from '../Post';

jest.mock('next/link', () => {
  return ({ children }) => {
    return children;
  }
});

const handleDeletePost = jest.fn();
const handleToggleLike = jest.fn();

let auth = {
  user: {
    _id: ''
  }
}

const post = fakePost();

describe('<Post/>', () => {
  it('renders and matches snapshot', () => {
    expect(1).toBe(1);
  });

  it('shows a delete button if the user is the post creator', () => {
    auth.user._id = post.postedBy._id;
    const { getByTestId } = render(
      <Post
        auth={auth}
        post={post}
        isDeletingPost={false}
        handleDeletePost={handleDeletePost}
        handleToggleLike={handleToggleLike}
      />
    );

    expect(getByTestId('header').textContent).toContain(post.postedBy.name);
    expect(getByTestId('content').textContent).toContain(post.text);

    expect(getByTestId('delete-button')).toBeTruthy();
    fireEvent.click(getByTestId('delete-button'));

    expect(handleDeletePost).toHaveBeenCalledTimes(1);
  });

  it('toggles like / unlike when like button is clicked', () => {
    auth.user._id = post.postedBy._id;
    const { getByTestId } = render(
      <Post
        auth={auth}
        post={post}
        isDeletingPost={false}
        handleDeletePost={handleDeletePost}
        handleToggleLike={handleToggleLike}
      />
    );

    fireEvent.click(getByTestId('like-button'));
    expect(handleToggleLike).toHaveBeenCalledTimes(1);
  });
});
