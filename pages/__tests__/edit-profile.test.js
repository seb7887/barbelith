import 'react-testing-library/cleanup-after-each';

import { render } from 'react-testing-library';
import EditProfilePage from '../edit-profile';

const auth = {
  user: {
    _id: '7'
  }
};

const mockedProps = {
  auth
};

describe('<EditProfilePage />', () => {
  it('renders and matches snapshot', () => {
    const { asFragment } = render(
      <EditProfilePage {...mockedProps} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});