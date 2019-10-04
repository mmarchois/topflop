import React from 'react';
import { Link } from 'react-router-dom';

const HomeView = () => {
  return (
    <>
      Bienvenue sur la Home page !
      <br />
      <Link to={'/register'}>S'inscrire</Link>
    </>
  );
};

export default HomeView;
