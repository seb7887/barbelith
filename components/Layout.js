import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

const theme = {
  black: 'black',
  white: 'white',
  coral: '#fc766a',
  type: 'light'
}

const Page = styled.div`
  background: ${props => props.theme.white};
  color: ${props => props.theme.black};
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: "Segoe UI", sans-serif;
  }
`;

const Layout = (props) => (
  <ThemeProvider theme={theme}>
    <Page>
      <GlobalStyle />
      {props.children}
    </Page>
  </ThemeProvider>
)

export default Layout;
