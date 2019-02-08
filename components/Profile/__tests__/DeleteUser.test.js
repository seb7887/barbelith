/* eslint-env jest */
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';

import { render, fireEvent, waitForElement } from 'react-testing-library';
import { deleteUser as mockedDeleteUser } from '../../../lib/api';
import DeleteUser from '../DeleteUser';

jest.mock('../../../lib/api', () => {
  return {
    deleteUser: jest.fn(() => Promise.resolve())
  };
});

afterEach(() => {
  mockedDeleteUser.mockClear();
});

describe('<DeleteUser/>', () => {
  it('renders and matches snapshot', () => {
    const { asFragment } = render(
      <DeleteUser user={{}} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should cancel the confirmation dialog', async () => {
    const { getByTestId } = render(
      <DeleteUser user={{}} />
    );

    // click delete button
    fireEvent.click(getByTestId('delete-button'));

    // wait for dialog
    const dialog = await waitForElement(() => getByTestId('dialog'));
    expect(dialog.textContent).toContain('Delete Account');

    fireEvent.click(getByTestId('button-cancel'));
    expect(getByTestId('delete-button')).toBeTruthy();
  });

  it('should delete user if user confirm action', async () => {
    const { getByTestId } = render(
      <DeleteUser user={{}} />
    );

    // click delete button
    fireEvent.click(getByTestId('delete-button'));

    // wait for dialog
    const dialog = await waitForElement(() => getByTestId('dialog'));
    expect(dialog.textContent).toContain('Delete Account');

    fireEvent.click(getByTestId('button-confirm'));
    expect(getByTestId('button-confirm')).toBeDisabled();

    expect(getByTestId('button-confirm').textContent).toContain('Deleting');
    expect(mockedDeleteUser).toHaveBeenCalledTimes(1);
  });

  it('should thrown an error if api call fails', async () => {
    const { getByTestId } = render(
      <DeleteUser user={{}} />
    );

    mockedDeleteUser.mockRejectedValueOnce('Fail!');

    // click delete button
    fireEvent.click(getByTestId('delete-button'));

    // wait for dialog
    const dialog = await waitForElement(() => getByTestId('dialog'));
    expect(dialog.textContent).toContain('Delete Account');

    fireEvent.click(getByTestId('button-confirm'));

    expect(getByTestId('button-confirm').textContent).toContain('Deleting');
    expect(mockedDeleteUser).toHaveBeenCalledTimes(1);
  });
});