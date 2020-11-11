import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentHeader from '../../../../components/ContentHeader';
import PaginationNavigation from '../../../../components/PaginationNavigation';
import SavedLinkListItem from '../../../../components/SavedLinkListItem';
import {
  resetNsfwFilter,
  setNsfwFilter,
  setSearchResults,
} from '../../../../redux/actions';

function FilterByNSFW() {
  const dispatch = useDispatch();
  const {
    pageResults,
    loadNumberedPage,
    currentPage,
    searchPages,
  } = useSelector(state => state.saved);

  useEffect(() => {
    dispatch(setNsfwFilter());
    dispatch(setSearchResults({ value: '' }));
    return () => {
      dispatch(resetNsfwFilter());
    };
  }, [dispatch]);

  return (
    <section className="w-full">
      <ContentHeader title="NSFW" />
      <div className="flex flex-wrap justify-center pt-32">
        {pageResults &&
          pageResults.map(link => (
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

export default FilterByNSFW;
