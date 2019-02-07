/* eslint-env jest */
import 'react-testing-library/cleanup-after-each';

import { render } from 'react-testing-library';
import SignupPage from '../signup';

describe('<SignupPage />', () => {
  it('renders and matches snapshot', () => {
    const { asFragment } = render(
      <SignupPage />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
