import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchResults } from '../redux/actions';
import PropTypes from 'prop-types';

function Search({ subredditSearchValue, setSubredditSearchValue }) {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchResults({ value: searchValue }));
  }, [searchValue, dispatch]);
  return (
    <div className="w-3/6 sm:w-3/6 md:w-2/6 lg:w-4/12 xl:w-2/6 px-3">
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor="search-input"
      >
        Search
      </label>
      <input
        value={subredditSearchValue ? subredditSearchValue : searchValue}
        onChange={e =>
          setSubredditSearchValue
            ? setSubredditSearchValue(e.target.value)
            : setSearchValue(e.target.value)
        }
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="search-input"
        type="text"
        placeholder={
          setSubredditSearchValue ? 'BearsDoingHumanThings...' : 'Title of post..'
        }
      />
    </div>
  );
}

Search.propTypes = {
  subredditSearchValue: PropTypes.string,
  setSubredditSearchValue: PropTypes.func,
}

export default Search;
