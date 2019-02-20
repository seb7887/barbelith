/* eslint-env jest */
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';

import { render, fireEvent, waitForElement } from 'react-testing-library';
import faker from 'faker';
import {
  getUser as mockedGetUser,
  getPostsByUser as mockedGetPostByUser,
  deletePost as mockedDeletePost,
  likePost as mockedLikePost,
  unlikePost as mockedUnlikePost,
  addComment as mockedAddComment,
  deleteComment as mockedDeleteComment
} from '../../../lib/api';
import { mockedUser, fakePost, fakeUser, generateComments } from '../../../utils/testUtils';
import Profile from '../Profile';

const user = mockedUser();
user.followers = [];
user.followers.push(fakeUser());
const post = fakePost();
const comment = generateComments(1);

let mockedProps;

jest.mock('next/link', () => {
  return ({ children }) => {
    return children;
  }
});

jest.mock('../../../lib/api', () => {
  return {
    getUser: jest.fn(() => Promise.resolve()),
    getPostsByUser: jest.fn(() => Promise.resolve()),
    deletePost: jest.fn(() => Promise.resolve()),
    likePost: jest.fn(() => Promise.resolve()),
    unlikePost: jest.fn(() => Promise.resolve()),
    addComment: jest.fn(() => Promise.resolve()),
    deleteComment: jest.fn(() => Promise.resolve())
  };
});

afterEach(() => {
  mockedGetUser.mockClear();
  mockedGetPostByUser.mockClear();
  mockedDeletePost.mockClear();
  mockedLikePost.mockClear();
  mockedUnlikePost.mockClear();
  mockedAddComment.mockClear();
  mockedDeleteComment.mockClear();
});

describe('<Profile/>', () => {
  it('renders and matches snapshot', () => {
    mockedProps = {
      userId: '7',
      auth: {
        user: {
          _id: '7'
        }
      }
    };

    mockedGetUser.mockResolvedValueOnce(user);
    mockedGetPostByUser.mockResolvedValueOnce([]);
    const { asFragment } = render(
      <Profile {...mockedProps} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders an edit link if is an auth user', async () => {
    mockedProps = {
      userId: '7',
      auth: {
        user: {
          _id: '7'
        }
      }
    };

    mockedGetUser.mockResolvedValueOnce(user);
    mockedGetPostByUser.mockResolvedValueOnce([post]);
    const { getByTestId } = render(
      <Profile {...mockedProps} />
    );

    const edit = await waitForElement(() => getByTestId('is-auth'));
    expect(edit).toBeTruthy();
  });

  it('renders a follow / unfollow button if is an unauth user', async () => {
    mockedProps = {
      userId: '11',
      auth: {
        user: {
          _id: '7'
        }
      }
    };

    mockedGetUser.mockResolvedValueOnce(user);
    mockedGetPostByUser.mockResolvedValueOnce([post]);
    const { getByText } = render(
      <Profile {...mockedProps} />
    );

    const follow = await waitForElement(() => getByText('Follow'));
    expect(follow).toBeTruthy();
  });

  it('should delete a post', async () => {
    mockedGetUser.mockResolvedValueOnce(user);
    mockedGetPostByUser.mockResolvedValueOnce([post]);
    mockedDeletePost.mockResolvedValueOnce(post)
    const { getByTestId } = render(
      <Profile {...mockedProps} />
    );

    const deleteButton = await waitForElement(() => getByTestId('delete-button'));
    fireEvent.click(deleteButton);
    expect(mockedDeletePost).toHaveBeenCalledTimes(1);
  });

  it('should like a post', async () => {
    mockedGetUser.mockResolvedValueOnce(user);
    mockedGetPostByUser.mockResolvedValueOnce([post]);
    mockedUnlikePost.mockResolvedValueOnce(post);
    const { getByTestId } = render(
      <Profile {...mockedProps} />
    );

    const likeButton = await waitForElement(() => getByTestId('like-button'));
    fireEvent.click(likeButton);
    expect(mockedUnlikePost).toHaveBeenCalledTimes(1);
  });

  it('should add a comment', async () => {
    mockedGetUser.mockResolvedValueOnce(user);
    mockedGetPostByUser.mockResolvedValueOnce([post]);
    mockedAddComment.mockResolvedValueOnce(post)
    const { getByTestId, getByLabelText } = render(
      <Profile {...mockedProps} />
    );

    const commentText = await waitForElement(() => getByLabelText(/add comments/i));
    fireEvent.change(commentText, { target: { value: faker.lorem.text() } })

    const form = getByTestId('form');
    fireEvent.submit(form);

    expect(mockedAddComment).toHaveBeenCalledTimes(1);
  });

  it('should delete a comment', async () => {
    post.comments.push(comment[0]);
    mockedGetUser.mockResolvedValueOnce(user);
    mockedGetPostByUser.mockResolvedValueOnce([post]);
    mockedDeleteComment.mockResolvedValueOnce(post)
    const { getByTestId } = render(
      <Profile {...mockedProps} />
    );

    const deleteComment = await waitForElement(() => getByTestId('delete-comment'));
    fireEvent.click(deleteComment);
    expect(mockedDeleteComment).toHaveBeenCalledTimes(1);
  });
});
