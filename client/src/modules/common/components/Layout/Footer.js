import React from 'react';
import i18n from '../../../../i18n';

const Footer = () => {
  const date = new Date();

  return (
    <footer className="footer">
      <div className="container">
        <div className="row align-items-center flex-row-reverse">
          <div className="col-auto ml-lg-auto">
            <div className="row align-items-center">
              <div className="col-auto">
                <ul className="list-inline list-inline-dots mb-0">
                  <li className="list-inline-item">
                    Copyright © {date.getFullYear()}{' '}
                    <a
                      href="https://twitter.com/mmarchois"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Mathieu MARCHOIS
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="https://github.com/mmarchois/topflop"
                      className="btn btn-sm btn-outline-primary"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <i className="icon fe fe-github mr-2"></i>
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
  );
};

export default Footer;
