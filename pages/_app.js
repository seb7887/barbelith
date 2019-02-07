import App, { Container } from 'next/app';
import Head from 'next/head';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import NProgress from 'next-nprogress/component';
import Navbar from '../components/Navbar/Navbar';
import getPageContext from '../lib/getPageContext';

class MyApp extends App {
  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS
    const jssStyles = document.querySelector('#jsee-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>Barbelith</title>
        </Head>

        {/* Wrap every page in Jss and Theme providers */}
        {/* MuiThemeProvider makes them available down the React tree */}
        {/* Thank React Context API! */}
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon */}
            <CssBaseline />
            <Navbar {...this.props} />
            <Component pageContext={this.pageContext} {...pageProps} />
          </MuiThemeProvider>
        </JssProvider>
        <NProgress
          color='#fc766a'
          showAfter={200}
          options={{ tickleSpeed: 50 }}
          spinner={false}
        />
      </Container>
    );
  }
}

export default MyApp;