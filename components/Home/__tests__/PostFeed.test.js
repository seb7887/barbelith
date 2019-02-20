/* eslint-env jest */
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';

import { render, fireEvent, waitForElement, wait } from 'react-testing-library';
import faker from 'faker';
import { fakePost, generateComments } from '../../../utils/testUtils';
import PostFeed from '../PostFeed';
import {
  getPostFeed as mockedGetPostFeed,
  addPost as mockedAddPost,
  deletePost as mockedDeletePost,
  likePost as mockedLikePost,
  unlikePost as mockedUnlikePost,
  addComment as mockedAddComment,
  deleteComment as mockedDeleteComment
} from '../../../lib/api';

jest.mock('next/link', () => {
  return ({ children }) => {
    return children;
  }
});

jest.mock('../../../lib/api', () => {
  return {
    getPostFeed: jest.fn(() => Promise.resolve()),
    addPost: jest.fn(() => Promise.resolve()),
    deletePost: jest.fn(() => Promise.resolve()),
    likePost: jest.fn(() => Promise.resolve()),
    unlikePost: jest.fn(() => Promise.resolve()),
    addComment: jest.fn(() => Promise.resolve()),
    deleteComment: jest.fn(() => Promise.resolve())
  }
});

afterEach(() => {
  mockedGetPostFeed.mockClear();
  mockedAddPost.mockClear();
  mockedDeletePost.mockClear();
  mockedLikePost.mockClear();
  mockedUnlikePost.mockClear();
  mockedAddComment.mockClear();
  mockedDeleteComment.mockClear();
});

let posts = fakePost();

const comment = generateComments(1);

let auth = {
  user: {
    _id: '7',
    name: 'test',
    avatar: 'test.jpg'
  }
};

describe('<PostFeed/>', () => {
  it('renders and matches snapshot', () => {
    mockedGetPostFeed.mockResolvedValueOnce([]);
    const { asFragment } = render(
      <PostFeed auth={auth} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should add a post', () => {
    mockedGetPostFeed.mockResolvedValueOnce([]);
    const { getByTestId } = render(
      <PostFeed auth={auth} />
    );

    // fill form
    fireEvent.change(getByTestId('image'), { target: { files: [faker.image.avatar()] } });

    // submit post
    const submitButton = getByTestId('submit');
    expect(submitButton).toBeDisabled();
  });

  it('should delete a post', async () => {
    mockedGetPostFeed.mockResolvedValueOnce([posts]);
    mockedDeletePost.mockResolvedValueOnce(posts);
    const { getByTestId } = render(
      <PostFeed auth={auth} />
    );

    const deleteButton = await waitForElement(() => getByTestId('delete-button'));
    fireEvent.click(deleteButton);
    expect(mockedDeletePost).toHaveBeenCalledTimes(1);
  })

  it('should like a post', async () => {
    mockedGetPostFeed.mockResolvedValueOnce([posts]);
    mockedUnlikePost.mockResolvedValueOnce(posts);
    const { getByTestId } = render(
      <PostFeed auth={auth} />
    );

    const likeButton = await waitForElement(() => getByTestId('like-button'));
    fireEvent.click(likeButton);
    expect(mockedUnlikePost).toHaveBeenCalledTimes(1);
  });

  it('should add a comment', async () => {
    mockedGetPostFeed.mockResolvedValueOnce([posts]);
    mockedAddComment.mockResolvedValueOnce(posts);
    const { getByTestId, getByLabelText } = render(
      <PostFeed auth={auth} />
    );

    const commentText = await waitForElement(() => getByLabelText(/add comments/i));
    fireEvent.change(commentText, { target: { value: faker.lorem.text() } })

    const form = getByTestId('form');
    fireEvent.submit(form);

    expect(mockedAddComment).toHaveBeenCalledTimes(1);
  });

  it('should delete a comment', async () => {
    posts.comments.push(comment[0]);
    mockedGetPostFeed.mockResolvedValueOnce([posts]);
    mockedDeleteComment.mockResolvedValueOnce(posts);
    const { getByTestId } = render(
      <PostFeed auth={auth} />
    );

    const deleteComment = await waitForElement(() => getByTestId('delete-comment'));
    fireEvent.click(deleteComment);
    expect(mockedDeleteComment).toHaveBeenCalledTimes(1);
  })
});
