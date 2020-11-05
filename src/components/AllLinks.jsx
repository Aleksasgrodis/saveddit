import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { loadNumberedPage, setPostSearchValue } from '../redux/actions';
import ContentHeader from './ContentHeader';
import PaginationNavigation from './PaginationNavigation';
import SavedLinkListItem from './SavedLinkListItem';

const pageSelector = state => state.saved.pageResults;

function AllLinks() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const searchResults = useSelector(state => state.saved.searchResult);
  console.log(searchResults);
  const search = { searchValue, setSearchValue };
  useEffect(() => {
    dispatch(loadNumberedPage({ page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setPostSearchValue({value: searchValue}))
  }, [searchValue, dispatch])

  const { pageResults, currentPage, pages } = useSelector(state => state.saved);
  return (
    <div className="w-full">
      <ContentHeader withSort={true} {...search} />
      <div className="flex flex-wrap justify-center pt-32">
        {pageResults.map(link => (
          <SavedLinkListItem key={link.permalink} {...link} />
        ))}
      </div>
      <PaginationNavigation
        total={pages}
        action={loadNumberedPage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default AllLinks;
