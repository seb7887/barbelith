/* eslint-env jest */
import { cleanup, render } from 'react-testing-library';
import Home from '../Home';

afterEach(cleanup);

describe('<Home/>', () => {
  let auth = {};

  it('renders the splash screen when signed out', () => {
    const { getByTestId, asFragment } = render(
      <Home {...auth} />
    );

    expect(getByTestId('home').textContent).toContain('Say you want a revolution?');
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders user feed when signed in', () => {
    auth = {
      auth: {
        user: {
          _id: 1
        }
      }
    };

    const { getByTestId } = render(
      <Home {...auth} />
    );

    expect(getByTestId('home').textContent).toContain('Hello World');
  });
});
