/* eslint-env jest */
import 'react-testing-library/cleanup-after-each';

import { render, fireEvent, waitForElement } from 'react-testing-library';
import { fakePost, fakeUser } from '../../../utils/testUtils';
import ProfileTabs from '../ProfileTabs';

let auth = {
  user: {
    _id: '7'
  }
};

const user = fakeUser();
user.following = [];
user.following.push(fakeUser());
user.following[0]._id = '8';
const post = fakePost();

const handleDeletePost = jest.fn();
const handleToggleLike = jest.fn();
const handleAddComment = jest.fn();
const handleDeleteComment = jest.fn();

jest.mock('next/link', () => {
  return ({ children }) => {
    return children;
  }
});

describe('<ProfileTabs/>', () => {
  it('renders and matches snapshot', () => {
    const { asFragment } = render(
      <ProfileTabs
        auth={auth}
        posts={[]}
        user={{}}
        isDeletingPost={false}
        handleDeletePost={handleDeletePost}
        handleToggleLike={handleToggleLike}
        handleAddComment={handleAddComment}
        handleDeleteComment={handleDeleteComment}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('changes tab correctly', async () => {
    const { getByTestId } = render(
      <ProfileTabs
        auth={auth}
        posts={[post]}
        user={user}
        isDeletingPost={false}
        handleDeletePost={handleDeletePost}
        handleToggleLike={handleToggleLike}
        handleAddComment={handleAddComment}
        handleDeleteComment={handleDeleteComment}
      />
    );

    const content = await waitForElement(() => getByTestId('content'));
    expect(content.textContent).toContain(post.text);

    fireEvent.click(getByTestId('tab2'));
    const following = await waitForElement(() => getByTestId('follow-tab'));
    expect(following.textContent).toContain(user.following[0].name);
  });
});
