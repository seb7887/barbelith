/* eslint-env jest */
import 'react-testing-library/cleanup-after-each';

import { render } from 'react-testing-library';
import SigninPage from '../signin';

describe('<SigninPage />', () => {
  it('renders and matches snapshot', () => {
    const { asFragment } = render(
      <SigninPage />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
