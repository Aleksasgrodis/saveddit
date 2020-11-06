import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadNumberedPage, setSubredditFilter } from '../redux/actions';
import ContentHeader from './ContentHeader';
import PaginationNavigation from './PaginationNavigation';
import SavedLinkListItem from './SavedLinkListItem';

function FilterBySubreddit() {
  const { subreddit } = useParams();
  const dispatch = useDispatch();
  const { pageResults, currentPage, searchPages } = useSelector(
    state => state.saved,
  );

  useEffect(() => {
    dispatch(setSubredditFilter({ subreddit: subreddit }));
    return () => {
      dispatch(setSubredditFilter({ subreddit: null }));
    };
  }, [dispatch, subreddit]);

  return (
    <div>
      <ContentHeader title={`r/${subreddit}`} withSort={true} />
      <div className="flex flex-wrap justify-center pt-32">
        {pageResults.map(link => (
          <SavedLinkListItem key={link.permalink} {...link} />
        ))}
      </div>
      <PaginationNavigation
        total={searchPages}
        action={loadNumberedPage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default FilterBySubreddit;
