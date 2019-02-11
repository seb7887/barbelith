/* eslint-env jest */
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';

import { render, fireEvent, waitForElement } from 'react-testing-library';
import { generateUsers } from '../../../utils/testUtils';
import { getUserFeed as mockedGetUserFeed } from '../../../lib/api';
import { followUser as mockedFollowUser } from '../../../lib/api';

import UserFeed from '../UserFeed';

jest.mock('../../../lib/api', () => {
  return {
    getUserFeed: jest.fn(() => Promise.resolve()),
    followUser: jest.fn(() => Promise.resolve())
  };
});

jest.mock('next/link', () => {
  return ({ children }) => {
    return children;
  }
});

afterEach(() => {
  mockedGetUserFeed.mockClear();
  mockedFollowUser.mockClear();
});

const users = generateUsers(3);

const auth = {
  user: {
    _id: '7'
  }
};

describe('<UserFeed/>', () => {
  it('renders and matches snapshot', () => {
    mockedGetUserFeed.mockResolvedValueOnce(users);
    const { asFragment } = render(
      <UserFeed auth={auth} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('lists user feed', async () => {
    mockedGetUserFeed.mockResolvedValueOnce(users);
    const { getByTestId, container } = render(
      <UserFeed auth={auth} />
    );

    // Wait for users list
    await waitForElement(() => getByTestId('list'));

    const items = container.querySelectorAll('li');
    expect(items).toHaveLength(users.length);
  });

  it('follows an user from the user feed', async () => {
    mockedGetUserFeed.mockResolvedValueOnce(users);
    mockedFollowUser.mockResolvedValueOnce(users[0]);
    const { getByTestId, container } = render(
      <UserFeed auth={auth} />
    );

    // Wait for users list
    await waitForElement(() => getByTestId('list'));

    const items = container.querySelectorAll('li');
    expect(items).toHaveLength(users.length);

    const followButton = getByTestId('follow');
    fireEvent.click(followButton);

    const snack = await waitForElement(() => getByTestId('snack'));
    expect(snack.textContent).toContain('Following');
  });
});
