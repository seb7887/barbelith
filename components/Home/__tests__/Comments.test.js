/* eslint-env jest */
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';

import { render, fireEvent } from 'react-testing-library';
import faker from 'faker';
import { generateComments } from '../../../utils/testUtils';
import Comments from '../Comments';

const handleAddComment = jest.fn();
const handleDeleteComment = jest.fn();

let auth = {
  user: {
    _id: '7'
  }
}

const comments = generateComments(3);
const postId = '8';

describe('<Comments/>', () => {
  it('renders and matches snapshot', () => {
    const { asFragment } = render(
      <Comments
        auth={auth}
        postId={postId}
        comments={[]}
        handleAddComment={handleAddComment}
        handleDeleteComment={handleDeleteComment}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should display comments correctly', () => {
    const { getAllByTestId } = render(
      <Comments
        auth={auth}
        postId={postId}
        comments={comments}
        handleAddComment={handleAddComment}
        handleDeleteComment={handleDeleteComment}
      />
    );

    expect(getAllByTestId('comment')).toHaveLength(3);
  });

  it('should add a comment', () => {
    const { getByTestId, getByLabelText } = render(
      <Comments
        auth={auth}
        postId={postId}
        comments={comments}
        handleAddComment={handleAddComment}
        handleDeleteComment={handleDeleteComment}
      />
    );

    fireEvent.change(getByLabelText(/add comments/i), { target: { value: faker.lorem.text() } })

    const form = getByTestId('form');
    fireEvent.submit(form);

    expect(handleAddComment).toHaveBeenCalledTimes(1);
  });

  it('should delete a comment', () => {
    const { getByTestId } = render(
      <Comments
        auth={auth}
        postId={postId}
        comments={comments}
        handleAddComment={handleAddComment}
        handleDeleteComment={handleDeleteComment}
      />
    );

    fireEvent.click(getByTestId('delete-comment'));

    expect(handleDeleteComment).toHaveBeenCalledTimes(1);
  });
});
