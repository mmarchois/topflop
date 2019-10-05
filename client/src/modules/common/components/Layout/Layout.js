import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';

const Layout = ({ children }) => {
  return (
    <>
      <div className={'flex-fill'}>
        <Header />
        <Nav />

        <div className={'my-3 my-md-5'}>
          <div className={'container'}>{children}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
