/* eslint-env jest */
import { cleanup, render } from 'react-testing-library';
import Router from 'next/router';
import ActiveLink from '../ActiveLink';

Router.router = {
  push() { },
  prefetch() { }
};

const mockedChildren = 'Barbelith';

afterEach(cleanup);

describe('<ActiveLink/>', () => {
  it('renders and matches snapshot', () => {
    const { getByTestId, asFragment } = render(
      <ActiveLink href='/' {...Router}>
        {mockedChildren}
      </ActiveLink>
    );

    expect(getByTestId('active-link').textContent).toContain('Barbelith');
    expect(asFragment()).toMatchSnapshot();
  });
});