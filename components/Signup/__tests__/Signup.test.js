/* eslint-env jest */
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';

import { render, fireEvent, waitForElement } from 'react-testing-library';
import { validUser, fakeUser } from '../../../utils/testUtils';
import { signupUser as mockSignupUser } from '../../../lib/auth';
import Signup from '../Signup';

let me = validUser();

jest.mock('../../../lib/auth', () => {
  return {
    signupUser: jest.fn(() => Promise.resolve())
  };
});

afterEach(() => {
  mockSignupUser.mockClear();
});

describe('<Signup/>', () => {
  it('renders and matches snapshot', () => {
    const { asFragment } = render(
      <Signup />
    )
    expect(asFragment()).toMatchSnapshot();
  });

  it('should create correctly a new user', async () => {
    const { getByLabelText, getByTestId } = render(
      <Signup />
    );

    mockSignupUser.mockResolvedValueOnce(me);

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

    const success = await waitForElement(() => getByTestId('success'));
    expect(success.textContent).toContain(`User ${me.name} successfully created!`);
  });

  it('should display an error if input validation failed', async () => {
    const { getByLabelText, getByTestId } = render(
      <Signup />
    );

    me = fakeUser();

    mockSignupUser.mockRejectedValueOnce({ message: 'Validation failed!' });

    // fill form data
    fireEvent.change(getByLabelText(/name/i), { target: { value: me.name } });
    fireEvent.change(getByLabelText(/email/i), { target: { value: me.email } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: me.password } });

    // submit form
    const submitButton = getByTestId('submit');
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();

    const postError = await waitForElement(() => getByTestId('error'));
    expect(postError.textContent).toContain('Validation failed!');
  })
});
