import React from 'react';
import { storiesOf } from '@storybook/react';
import { Viewport } from '@storybook/addon-viewport';
import Signin from '../Signin';

storiesOf('Signin', module)
  .add('with medium viewport', () => {
    return (
      <Viewport name='medium'>
        <Signin />
      </Viewport>
    );
  })
  .add('with small viewport', () => {
    return (
      <Viewport name='small'>
        <Signin />
      </Viewport>
    );
  });