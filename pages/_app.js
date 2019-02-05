import App, { Container } from 'next/app';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';

class MyApp extends App {
  constructor(props) {
    super(props);
  }

  render() {
    const { Component } = this.props;
    return (
      <Container>
        <Navbar {...this.props} />
        <Layout>
          <Component />
        </Layout>
      </Container>
    );
  }
}

export default MyApp;