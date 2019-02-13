/* eslint-env jest */
import 'react-testing-library/cleanup-after-each';

import { render } from 'react-testing-library';
import { generateUsers } from '../../../utils/testUtils';
import FollowTab from '../FollowTab';

const user = generateUsers(1);

jest.mock('next/link', () => {
  return ({ children }) => {
    return children;
  }
});

describe('<FollowTab/>', () => {
  it('renders and matches snapshot', () => {
    const { asFragment } = render(
      <FollowTab users={[]} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('show users correctly', () => {
    const { getByTestId } = render(
      <FollowTab users={user} />
    );

    expect(getByTestId('follow-tab').textContent).toContain(user[0].name);
  });
});
