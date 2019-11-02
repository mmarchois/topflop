import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import Notification from '../../../notifier/components/Notification';

const Layout = ({ children, authenticated }) => {
  return (
    <>
      <div className={'flex-fill'}>
        <Header />
        <Nav />
        <div className={'my-3 my-md-5'}>
          <div className={'container'}>
            {authenticated && <Notification />}
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default connect(state => ({
  authenticated: state.auth.authentication.authenticated,
}))(Layout);
