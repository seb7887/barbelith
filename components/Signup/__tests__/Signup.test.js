/* eslint-env jest */
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';

import { cleanup, render, fireEvent } from 'react-testing-library';
import { fakeUser } from '../../../utils/testUtils';
import { signupUser as mockSignupUser } from '../../../lib/auth';
import Signup from '../Signup';

const me = fakeUser();

jest.mock('../../../lib/auth', () => {
  return {
    signupUser: jest.fn(() => Promise.resolve())
  };
});

afterEach(() => {
  mockSignupUser.mockClear();
});

/**
 * TODO:
 * - Snapshot -> OK
 * - Correct submission
 * - Error submission
 */

describe('<Signup/>', () => {
  it('renders and matches snapshot', () => {
    const { asFragment } = render(
      <Signup />
    )
    expect(asFragment()).toMatchSnapshot();
  });

  it('should create correctly a new user', () => {
    const { getByLabelText, getByTestId } = render(
      <Signup />
    );

    // fill form data
    fireEvent.change(getByLabelText(/name/i), { target: { value: me.name } });
    fireEvent.change(getByLabelText(/email/i), { target: { value: me.email } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: me.password } });

    // submit form
    const submitButton = getByTestId('submit');
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();

    expect(mockSignupUser).toHaveBeenCalledTimes(1);
    expect(mockSignupUser).toHaveBeenCalledWith({
      ...me,
    });
  });
});
