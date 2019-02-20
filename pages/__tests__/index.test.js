/* eslint-env jest */
import 'react-testing-library/cleanup-after-each';

import { render } from 'react-testing-library';
import Index from '../index';

describe('<Index/>', () => {
  it('renders and matches snapshot', () => {
    const { asFragment } = render(
      <Index />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});