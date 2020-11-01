import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { loadNumberedPage } from '../redux/actions';
import SavedLinkListItem from './SavedLinkListItem';

const pageSelector = state => state.saved.pageResults;

function AllLinks() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadNumberedPage({ page: 2 }));
  }, [dispatch]);

  const { pageResults, currentPage } = useSelector(state => state.saved);
  return (
    <div>
      {currentPage > 1 ? (
        <button
          type="button"
          className="button"
          onClick={() => dispatch(loadNumberedPage({ page: currentPage - 1 }))}
        >
          Previous
        </button>
      ) : null}
      current page: {currentPage}
      <button
        type="button"
        className="button"
        onClick={() => dispatch(loadNumberedPage({ page: currentPage + 1 }))}
      >
        Next
      </button>
      <div className="w-full flex flex-wrap">
        {pageResults.map(link => (
          <SavedLinkListItem key={link.permalink} {...link} />
        ))}
      </div>
    </div>
  );
}

export default AllLinks;
