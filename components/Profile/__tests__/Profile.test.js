/* eslint-env jest */
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';

import { render, waitForElement } from 'react-testing-library';
import { getUser as mockedGetUser } from '../../../lib/api';
import { mockedUser } from '../../../utils/testUtils';
import Profile from '../Profile';

const user = mockedUser();

let mockedProps;

jest.mock('../../../lib/api', () => {
  return {
    getUser: jest.fn(() => Promise.resolve())
  };
});

afterEach(() => {
  mockedGetUser.mockClear();
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
    const { getByText } = render(
      <Profile {...mockedProps} />
    );

    const follow = await waitForElement(() => getByText('Follow'));
    expect(follow).toBeTruthy();
  });
});
