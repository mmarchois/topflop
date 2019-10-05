import React from 'react';
import { Link } from 'react-router-dom';

const HomeView = () => {
  return (
    <>
      <div className="page-title-box">
        <h2 className="page-title">Forms</h2>
      </div>
      <div className="row">
        <div className="col-12">
          <Link to={'/register'}>S'inscrire</Link>
          <Link to={'/login'}>Se connecter</Link>
        </div>
      </div>
    </>
  );
};

export default HomeView;
