import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HomeView = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="row">
        <div className={'col-lg-12'}>
          <div className={'card'}>
            <div className={'card-body text-wrap p-lg-6'}>
              <h1 className="page-title">{t('home.welcome')}</h1>
              <div className="mt-5">
                <Link to={'/register'} className="btn btn-primary mr-2">
                  {t('home.register')}
                </Link>{' '}
                <Link to={'/login'} className="btn btn-primary">
                  {t('home.login')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeView;
