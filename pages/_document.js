import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';
import { getSessionFromServer, getUserScript } from '../lib/auth';

export default class MyDocument extends Document {
  static getInitialProps(ctx) {
    const user = getSessionFromServer(ctx.req);

    // Render app and page and get the context of the page with collected side effects
    let pageContext;
    const page = ctx.renderPage(Component => {
      const WrappedComponent = props => {
        pageContext = props.pageContext;
        return <Component {...props} />;
      };
      return WrappedComponent;
    });

    return {
      ...user,
      ...page,
      pageContext,
      // Styles fragment is rendered after the app and page rendering finish
      styles: (
        <>
          <style
            id='jss-server-side'
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: pageContext.sheetsRegistry.toString()
            }}
          />
          {flush() || null}
        </>
      )
    };
  }

  render() {
    const { pageContext, user = {} } = this.props;
    return (
      <html lang='en' dir='ltr'>
        <Head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0, shrink-to-fit=no' />
          <meta name='theme-color' content='#ffffff' />
          <link rel='shortcut- icon' href='static/icon-512x512.png' type='image/x-icon' />
          <link rel="icon" sizes="512x512" href="/static/icon-512x512.png" />
          <link rel="apple-touch-icon" sizes="512x512" href="/static/icon-512x512.png" />
          <link rel="icon" href="/static/icon-192x192.png" />
          <link rel="apple-touch-icon" href="/static/icon-192x192.png" />
          <link rel="stylesheet" href="../static/fonts/fonts.css"></link>
        </Head>

        <body>
          <Main />
          <script dangerouslySetInnerHTML={{ __html: getUserScript(user) }} />
          <NextScript />
        </body>
      </html>
    );
  }
}