import { SheetsRegistry } from 'jss';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import createGenerateClassName from '@material-ui/core/styles/createGenerateClassName';

// App color theme
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true,
    fontFamily: ['"Segoe UI"', 'sans-serif']
  },
  palette: {
    primary: {
      main: '#fff'
    },
    secondary: {
      main: '#000'
    },
    favoriteIcon: {
      main: '#fc766a'
    },
    type: 'light'
  }
});

function createPageContext() {
  return {
    theme,
    // this is needed in order to deduplicate the injection of css in the page
    sheetsManager: new Map(),
    // this is needed in order to inject the critical css
    sheetsRegistry: new SheetsRegistry(),
    // the standard class name generator
    generateClassName: createGenerateClassName()
  };
}

export default function getPageContext() {
  // make sure to create a new context for every server-side request so that data
  // isn't shared between connections (really really BAD)
  if (!process.browser) {
    return createPageContext();
  }

  // reuse context on the client-side
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__;
}
