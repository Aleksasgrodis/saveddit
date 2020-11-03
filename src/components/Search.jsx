import React from 'react';
import { useHistory } from 'react-router-dom';
import SortingDropdown from './SortingDropdown';

function Search({ searchValue, setSearchValue, withSort, sortBy, ...props }) {
  // takes in props or array to search in and bounces results to page
  console.log('search render');
  const history = useHistory();
  return (
    <div className="mt-5 opacity-25 hover:opacity-100 focus:opacity-100 flex items-center">
      <button
        onClick={() => history.go(-1)}
        className="bg-gray-500 shadow-inner hover:bg-gray-700 text-white text-2xl font-bold py-1 px-4 rounded-lg mr-5 focus:outline-none focus:shadow-outline"
      >
        ←
      </button>
      <input
        type="text"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        className="focus:opacity-100 mr-5 py-1 shadow-inner px-4 bg-gray-500 text-white text-2xl rounded-lg placeholder-white focus:outline-none focus:shadow-outline"
        placeholder="Search"
      />
      {withSort ? <SortingDropdown sortBy={sortBy} /> : null}
    </div>
  );
}

export default Search;
