import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

const theme = {
  black: 'black',
  white: 'white',
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

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Page>
      <GlobalStyle />
      {children}
    </Page>
  </ThemeProvider>
)

export default Layout;
