import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { loadNumberedPage } from '../redux/actions';
import ContentHeader from './ContentHeader';
import PaginationNavigation from './PaginationNavigation';
import SavedLinkListItem from './SavedLinkListItem';

const pageSelector = state => state.saved.pageResults;

function AllLinks() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadNumberedPage({ page: 2 }));
  }, [dispatch]);

  const { pageResults, currentPage, pages } = useSelector(state => state.saved);
  return (
    <div className="w-full">
      <ContentHeader withSort={true} />
      <div className="flex flex-wrap justify-center pt-32">
        {pageResults.map(link => (
          <SavedLinkListItem key={link.permalink} {...link} />
        ))}
      </div>
        <PaginationNavigation total={pages} action={loadNumberedPage} currentPage={currentPage} />
    </div>
  );
}

export default AllLinks;
