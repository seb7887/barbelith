import React from 'react';
import { storiesOf } from '@storybook/react';
import { Viewport } from '@storybook/addon-viewport';
import Signup from '../Signup';

storiesOf('Signup', module)
  .add('with medium viewport', () => {
    return (
      <Viewport name='medium'>
        <Signup />
      </Viewport>
    );
  })
  .add('with small viewport', () => {
    return (
      <Viewport name='small'>
        <Signup />
      </Viewport>
    );
  });