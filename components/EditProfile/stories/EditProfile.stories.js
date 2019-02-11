import React from 'react';
import { storiesOf } from '@storybook/react';
import { Viewport } from '@storybook/addon-viewport';
import EditProfile from '../EditProfile';

const auth = {
  user: {
    _id: '7'
  }
};

const mockedProps = {
  auth
};

storiesOf('EditProfile', module)
  .add('with medium viewport', () => {
    return (
      <Viewport name='medium'>
        <EditProfile {...mockedProps} />
      </Viewport>
    );
  })
  .add('with small viewport', () => {
    return (
      <Viewport name='small'>
        <EditProfile {...mockedProps} />
      </Viewport>
    );
  });