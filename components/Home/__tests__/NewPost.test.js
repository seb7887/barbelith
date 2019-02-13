/* eslint-env jest */
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';

import { render, fireEvent } from 'react-testing-library';
import faker from 'faker';
import NewPost from '../NewPost';

const handleChange = jest.fn();
const handleAddPost = jest.fn();

const auth = {
  user: {
    name: 'test',
    avatar: faker.image.avatar()
  }
}

const text = faker.lorem.text();
const image = faker.image.avatar();

describe('<NewPost/>', () => {
  it('renders and matches snapshot', () => {
    const { asFragment } = render(
      <NewPost
        auth={{ user: { name: 'test', avatar: 'test.jpg' } }}
        text={'test'}
        image={'test.jpg'}
        isAddingPost={false}
        handleChange={handleChange}
        handleAddPost={handleAddPost}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders header successfully', () => {
    const { getByTestId } = render(
      <NewPost
        auth={auth}
        text={text}
        image={image}
        isAddingPost={false}
        handleChange={handleChange}
        handleAddPost={handleAddPost}
      />
    );

    expect(getByTestId('card').textContent).toContain('test');
    expect(getByTestId('card').textContent).toContain(text);
  });

  it('submits a post successfully', () => {
    const { getByTestId } = render(
      <NewPost
        auth={auth}
        text={text}
        image={image}
        isAddingPost={false}
        handleChange={handleChange}
        handleAddPost={handleAddPost}
      />
    );

    // fill form
    fireEvent.change(getByTestId('image'), { target: { files: [faker.image.avatar()] } });

    expect(handleChange).toHaveBeenCalledTimes(1);

    // submit post
    const submitButton = getByTestId('submit');
    fireEvent.click(submitButton);

    expect(handleAddPost).toHaveBeenCalledTimes(1);
  });
});
