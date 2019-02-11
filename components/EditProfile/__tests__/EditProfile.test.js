/* eslint-env jest */
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';

import { render, fireEvent, waitForElement } from 'react-testing-library';
import faker from 'faker';
import { updatedUser } from '../../../utils/testUtils';
import { getAuthUser as mockedGetAuthUser } from '../../../lib/api';
import { updateUser as mockedUpdateUser } from '../../../lib/api';
import EditProfile from '../EditProfile';

jest.mock('../../../lib/api', () => {
  return {
    getAuthUser: jest.fn(() => Promise.resolve()),
    updateUser: jest.fn(() => Promise.resolve())
  };
});

afterEach(() => {
  mockedGetAuthUser.mockClear();
  mockedUpdateUser.mockClear();
});

const user = updatedUser();

const auth = {
  user: {
    _id: '7'
  }
};

const mockedProps = {
  auth
};

global.URL.createObjectURL = jest.fn();

/**
 * TODO:
 * - snapshot
 * - edit ok -> OK
 * - edit wrong -> OK
 */

describe('<EditProfile/>', () => {
  it('renders and matches snapshot', () => {
    mockedGetAuthUser.mockResolvedValueOnce(user);
    const { asFragment } = render(
      <EditProfile {...mockedProps} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('can update user successfully', async () => {
    mockedGetAuthUser.mockResolvedValueOnce(user);
    mockedUpdateUser.mockResolvedValueOnce(user);
    const { getByTestId, getByLabelText } = render(
      <EditProfile {...mockedProps} />
    );

    expect(mockedGetAuthUser).toHaveBeenCalledTimes(1);
    expect(mockedGetAuthUser).toHaveBeenCalledWith(auth.user._id);

    const isLoaded = await waitForElement(() => getByTestId('big-avatar'));
    expect(isLoaded).toBeTruthy();

    // fill form data
    fireEvent.change(getByLabelText(/name/i), { target: { value: user.name } });
    fireEvent.change(getByLabelText(/email/i), { target: { value: user.email } });
    fireEvent.change(getByLabelText(/about/i), { target: { value: user.about } });
    fireEvent.change(getByTestId('avatar'), { target: { files: [faker.image.avatar()] } });

    // // submit form
    const submitButton = getByTestId('submit');
    fireEvent.click(submitButton);
    expect(submitButton).toBeDisabled();

    expect(mockedUpdateUser).toHaveBeenCalledTimes(1);

    const success = await waitForElement(() => getByTestId('success'));
    expect(success.textContent).toContain('Profile Updated');
  });

  it('shows error snackbar if update failed', async () => {
    mockedGetAuthUser.mockResolvedValueOnce(user);
    const { getByTestId, getByLabelText } = render(
      <EditProfile {...mockedProps} />
    );

    mockedUpdateUser.mockRejectedValueOnce({ message: 'Update Failed!' });

    expect(mockedGetAuthUser).toHaveBeenCalledTimes(1);
    expect(mockedGetAuthUser).toHaveBeenCalledWith(auth.user._id);

    const isLoaded = await waitForElement(() => getByTestId('big-avatar'));
    expect(isLoaded).toBeTruthy();

    // fill form data
    fireEvent.change(getByLabelText(/name/i), { target: { value: user.name } });
    fireEvent.change(getByLabelText(/email/i), { target: { value: user.email } });
    fireEvent.change(getByLabelText(/about/i), { target: { value: user.about } });
    fireEvent.change(getByTestId('avatar'), { target: { files: [faker.image.avatar()] } });


    // // submit form
    const submitButton = getByTestId('submit');
    fireEvent.click(submitButton);
    expect(submitButton).toBeDisabled();

    expect(mockedUpdateUser).toHaveBeenCalledTimes(1);

    const error = await waitForElement(() => getByTestId('error'));
    expect(error.textContent).toContain('Update Failed!');
  });
});
