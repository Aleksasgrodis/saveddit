import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadNumberedPage, setSearchResults, setSubredditFilter } from '../redux/actions';
import PaginationNavigation from './PaginationNavigation';
import SavedLinkListItem from './SavedLinkListItem';
import Search from './Search';

function FilterBySubreddit() {
  const { subreddit } = useParams();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const { pageResults, currentPage, searchPages } = useSelector(state => state.saved);

  useEffect(() => {
    dispatch(setSubredditFilter({ subreddit: subreddit }));
    return () => {
      dispatch(setSubredditFilter({ subreddit: null }));
    };
  }, [dispatch, subreddit]);

  useEffect(() => {
    dispatch(setSearchResults({value: searchValue}))
  }, [searchValue, dispatch])

  const search = { withSort: true, searchValue, setSearchValue };

  return (
    <div>
      <div className="fixed">
        <Search {...search} />
      </div>
      <div className="flex flex-wrap justify-center">
        {pageResults.map(link => (
          <SavedLinkListItem key={link.permalink} {...link} />
        ))}
      </div>
      <PaginationNavigation total={searchPages}
        action={loadNumberedPage}
        currentPage={currentPage} />
    </div>
  );
}

export default FilterBySubreddit;
