import React from 'react';
import i18n from '../../../../i18n';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row align-items-center flex-row-reverse">
          <div className="col-auto ml-lg-auto">
            <div className="row align-items-center">
              <div className="col-auto">
                <ul className="list-inline list-inline-dots mb-0">
                  <li className="list-inline-item">
                    {i18n.t('footer.opensource')}
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="https://github.com/mmarchois/topflop"
                      className="btn btn-sm btn-outline-primary"
                      target="_blank"
                      rel="noopener noreferrer"
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
