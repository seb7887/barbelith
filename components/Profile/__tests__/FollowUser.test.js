/* eslint-env jest */
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';

import { render, fireEvent } from 'react-testing-library';
import { followUser as mockedFollowUser } from '../../../lib/api';
import { unfollowUser as mockedUnfollowUser } from '../../../lib/api';
import FollowUser from '../FollowUser';

const toggleFollow = jest.fn();

jest.mock('../../../lib/api', () => {
  return {
    followUser: jest.fn(() => Promise.resolve()),
    unfollowUser: jest.fn(() => Promise.resolve())
  };
});

afterEach(() => {
  mockedFollowUser.mockClear();
  mockedUnfollowUser.mockClear();
});

describe('<FollowUser/>', () => {
  it('renders and matches snapshot', () => {
    const { asFragment } = render(
      <FollowUser isFollowing={false} toggleFollow={toggleFollow} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders a follow button if is not already following', () => {
    const { getByTestId } = render(
      <FollowUser isFollowing={false} toggleFollow={toggleFollow} />
    );

    expect(getByTestId('button').textContent).toContain('Follow');
  });

  it('renders an unfollow button if is already following', () => {
    const { getByTestId } = render(
      <FollowUser isFollowing={true} toggleFollow={toggleFollow} />
    );

    expect(getByTestId('button').textContent).toContain('Unfollow');
  });

  it('calls toggleFollow if button is clicked', () => {
    const { getByTestId } = render(
      <FollowUser isFollowing={false} toggleFollow={toggleFollow} />
    );

    fireEvent.click(getByTestId('button'));

    expect(toggleFollow).toHaveBeenCalledTimes(1);
  });
});
