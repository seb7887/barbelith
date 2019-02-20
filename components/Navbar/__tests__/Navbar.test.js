/* eslint-env jest */
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';

import { render, fireEvent } from 'react-testing-library';
import Router from 'next/router'
import Navbar from '../Navbar';
import { signoutUser as mockSignoutUser } from '../../../lib/auth';

jest.mock('../../../lib/auth', () => {
  return {
    signoutUser: jest.fn(() => Promise.resolve())
  };
});

Router.router = {
  pathname: '/',
  push: () => { },
  prefetch: () => { }
};

afterEach(() => {
  mockSignoutUser.mockClear();
});

describe('<Navbar/>', () => {
  let auth = {};

  it('renders a minimal nav when signed out', () => {
    const { getByTestId, asFragment } = render(
      <Navbar
        context={Router.router}
        pageProps={auth}
        {...Router}
      />
    );
    expect(getByTestId('navbar').textContent).toContain('Sign up');
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders a profile button when signed in', () => {
    auth = {
      auth: {
        user: {
          _id: 1
        }
      }
    };

    const { getByTestId } = render(
      <Navbar
        pageProps={auth}
        {...Router}
      />
    );

    expect(getByTestId('navbar').textContent).toContain('Profile');
  });

  it('sign out when signed in', async () => {
    const { getByTestId } = render(
      <Navbar
        pageProps={auth}
        {...Router}
      />
    );

    // submit form
    const signoutButton = getByTestId('signout-button');
    fireEvent.click(signoutButton);

    expect(mockSignoutUser).toHaveBeenCalledTimes(1);
  });
});
