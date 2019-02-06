/* eslint-env jest */
import { cleanup, render } from 'react-testing-library';
import Router from 'next/router'
import Navbar from '../Navbar';

Router.router = {
  pathname: '/',
  push: () => { },
  prefetch: () => { }
};

afterEach(cleanup);

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
});
