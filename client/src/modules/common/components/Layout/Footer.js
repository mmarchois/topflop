import React from 'react';
import { Link } from 'react-router-dom';
import i18n from '../../../../i18n';

const Footer = () => {
  return (
    <div className="footer">
      <footer className="footer">
        <div className="container">
          <div className="row align-items-center flex-row-reverse">
            <div className="col-auto ml-lg-auto">
              <div className="row align-items-center">
                <div className="col-auto">
                  <ul className="list-inline list-inline-dots mb-0">
                    <li className="list-inline-item">
                      {i18n.t('footer.madeBy')}{' '}
                      <Link to={'https://fairness.coop'} target="_blank">
                        Mathieu MARCHOIS
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <a
                        href="https://twitter.com/mmarchois"
                        className="btn btn-outline-primary btn-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="icon fe fe-twitter"></i>
                        {i18n.t('footer.twitter')}
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        href="https://github.com/mmarchois/topflop"
                        className="btn btn-outline-primary btn-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="icon fe fe-github"></i>
                        {i18n.t('footer.source')}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
