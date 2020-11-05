import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchResults } from '../redux/actions';
import SortingDropdown from './SortingDropdown';

function Search({
  withSort,
  subredditSearchValue,
  setSubredditSearchValue,
  ...props
}) {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchResults({ value: searchValue }));
  }, [searchValue, dispatch]);
  return (
    <div className="mt-5 opacity-25 hover:opacity-100 focus:opacity-100 flex items-center">
      <input
        type="text"
        value={subredditSearchValue ? subredditSearchValue : searchValue}
        onChange={e =>
          setSubredditSearchValue
            ? setSubredditSearchValue(e.target.value)
            : setSearchValue(e.target.value)
        }
        className="focus:opacity-100 mr-5 py-1 shadow-inner px-4 bg-gray-500 text-white text-2xl rounded-lg placeholder-white focus:outline-none focus:shadow-outline"
        placeholder="Search"
      />
      {withSort ? <SortingDropdown /> : null}
    </div>
  );
}

export default Search;
