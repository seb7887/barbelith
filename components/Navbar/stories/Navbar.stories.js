import React from 'react';
import { storiesOf } from '@storybook/react';
import { Viewport } from '@storybook/addon-viewport';
import Navbar from '../Navbar';

let auth = {};
let router = { pathname: '/' };

storiesOf('Navbar', module)
  .add('with medium viewport', () => {
    return (
      <Viewport name='medium'>
        <Navbar
          router={router}
          pageProps={auth}
        />
      </Viewport>
    );
  })
  .add('with small viewport', () => {
    return (
      <Viewport name='small'>
        <Navbar
          router={router}
          pageProps={auth}
        />
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
        <Navbar
          router={router}
          pageProps={auth}
        />
      </Viewport>
    );
  });