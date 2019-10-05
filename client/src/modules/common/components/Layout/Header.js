import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav>
      <Link to={'/'}>Accueil</Link>
      <Link to={'/register'}>S'inscrire</Link>
      <Link to={'/login'}>Se connecter</Link>
    </nav>
  );
};

export default Header;
