import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadNumberedPage, setSearchResults } from '../redux/actions';
import ContentHeader from './ContentHeader';
import PaginationNavigation from './PaginationNavigation';
import SavedLinkListItem from './SavedLinkListItem';

function AllLinks() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const search = { searchValue, setSearchValue };
  useEffect(() => {
    dispatch(loadNumberedPage({ page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSearchResults({ value: searchValue }));
  }, [searchValue, dispatch]);

  const { pageResults, currentPage, searchPages } = useSelector(
    state => state.saved,
  );
  return (
    <section className="w-full">
      <ContentHeader withSort={true} {...search} />
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
    </section>
  );
}

export default AllLinks;
