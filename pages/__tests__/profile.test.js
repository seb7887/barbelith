/* eslint-env jest */
import 'react-testing-library/cleanup-after-each';

import { render } from 'react-testing-library';
import ProfilePage from '../profile';

describe('<ProfilePage />', () => {
  it('renders and matches snapshot', () => {
    const { asFragment } = render(
      <ProfilePage />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});