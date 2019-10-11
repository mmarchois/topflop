import React from 'react';
import { useTranslation } from 'react-i18next';

const Search = ({ handleSearch, search, onChange }) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={handleSearch}>
      <div className="form-group">
        <div className="input-group">
          <input
            type={'text'}
            className={'form-control'}
            value={search}
            placeholder={t('user.list.searchPlaceholder')}
            onChange={onChange}
          />
          <span className="input-group-append">
            <button className="btn btn-secondary" type="button">
              <i className={'icon fe fe-search'} />
            </button>
          </span>
        </div>
      </div>
    </form>
  );
};

export default Search;
