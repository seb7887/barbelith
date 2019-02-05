/* eslint-env jest */
import { cleanup, render } from 'react-testing-library';
import Navbar from '../Navbar';

afterEach(cleanup);

describe('<Navbar/>', () => {
  let auth = {};
  let router = {
    pathname: '/'
  };

  it('renders a minimal nav when signed out', () => {
    const { getByTestId, asFragment } = render(
      <Navbar
        router={router}
        pageProps={auth}
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
        router={router}
        pageProps={auth}
      />
    );

    expect(getByTestId('navbar').textContent).toContain('Profile');
  });
});
