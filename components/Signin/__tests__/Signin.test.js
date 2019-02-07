/* eslint-env jest */
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';

import { render, fireEvent, waitForElement } from 'react-testing-library';
import { validUser, fakeUser } from '../../../utils/testUtils';
import { signinUser as mockSigninUser } from '../../../lib/auth';
import Signin from '../Signin';

const me = validUser();
const { email, password } = me;
const login = { email, password };

jest.mock('../../../lib/auth', () => {
  return {
    signinUser: jest.fn(() => Promise.resolve())
  };
});

afterEach(() => {
  mockSigninUser.mockClear();
});

describe('<Signin/>', () => {
  it('renders and matches snapshot', () => {
    const { asFragment } = render(
      <Signin />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should login if input data is correct', () => {
    const { getByLabelText, getByTestId } = render(
      <Signin />
    );

    // fill form data
    fireEvent.change(getByLabelText(/email/i), { target: { value: login.email } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: login.password } });

    // submit form
    const submitButton = getByTestId('submit');
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();

    expect(mockSigninUser).toHaveBeenCalledTimes(1);
    expect(mockSigninUser).toHaveBeenCalledWith({
      ...login
    });
  });

  it('should display an error if signin failed', async () => {
    const { getByLabelText, getByTestId } = render(
      <Signin />
    );

    mockSigninUser.mockRejectedValueOnce({ message: 'Sign in failed!' });

    // fill form data
    fireEvent.change(getByLabelText(/email/i), { target: { value: login.email } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: login.password } });

    // submit form
    const submitButton = getByTestId('submit');
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();

    const postError = await waitForElement(() => getByTestId('error'));
    expect(postError.textContent).toContain('Sign in failed!');
  });
});
