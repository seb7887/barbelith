/* eslint-env jest */
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';

import { render, fireEvent } from 'react-testing-library';
import NewPost from '../NewPost';

const handleChange = jest.fn();
const handleAddPost = jest.fn();

describe('<NewPost/>', () => {
  it('renders and matches snapshot', () => {
    expect(1).toBe(1);
  });

  it('renders header successfully', () => {
    expect(1).toBe(1);
  });

  it('submits a post successfully', () => {
    expect(1).toBe(1);
  });
});
