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
    <div className="w-3/6 sm:w-3/6 md:w-2/6 lg:w-4/12 xl:w-2/6 px-3 mr-5">
      <input
        value={subredditSearchValue ? subredditSearchValue : searchValue}
        onChange={e =>
          setSubredditSearchValue
            ? setSubredditSearchValue(e.target.value)
            : setSearchValue(e.target.value)
        }
        className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 shadow-md rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        id="search-input"
        type="text"
        placeholder={
          setSubredditSearchValue
            ? 'Search for subreddit title..'
            : 'Search for title..'
        }
      />
    </div>
  );
}

Search.propTypes = {
  subredditSearchValue: PropTypes.string,
  setSubredditSearchValue: PropTypes.func,
};

export default Search;
