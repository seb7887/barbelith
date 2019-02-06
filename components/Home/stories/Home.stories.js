import React from 'react';
import { storiesOf } from '@storybook/react';
import { Viewport } from '@storybook/addon-viewport';
import Home from '../Home';

let auth = {};

storiesOf('Home', module)
  .add('with medium viewport', () => {
    return (
      <Viewport name='medium'>
        <Home {...auth} />
      </Viewport>
    );
  })
  .add('with small viewport', () => {
    return (
      <Viewport name='small'>
        <Home {...auth} />
      </Viewport>
    );
  })
  .add('signed in', () => {
    auth = {
      auth: {
        user: {
          _id: 1
        }
      }
    };

    return (
      <Viewport name='large'>
        <Home {...auth} />
      </Viewport>
    );
  });