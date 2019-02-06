import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { configureViewport } from '@storybook/addon-viewport';

// pick all stories
const req = require.context('../components', true, /stories\.js$/);

addDecorator(withKnobs);

const viewports = {
  small: {
    name: 'small',
    styles: {
      width: '375px',
      height: '812px'
    }
  },
  medium: {
    name: 'medium',
    styles: {
      width: '800px',
      height: '600px'
    }
  },
  large: {
    name: 'large',
    styles: {
      width: '1280px',
      height: '1024px'
    }
  }
}

configureViewport({
  viewports
});

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
