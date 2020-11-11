import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import ContentHeader from '../../../../components/ContentHeader';
import SavedLinkListItem from '../../../../components/SavedLinkListItem';
import {
  resetNsfwFilter,
  setNsfwFilter,
  setSearchResults,
} from '../../../../redux/actions';

const linksSelector = state => state.saved.links;
const subredditLinksSelector = createSelector(linksSelector, links =>
  links.filter(link => link.over_18),
);

function FilterByNSFW() {
  const filteredPosts = useSelector(subredditLinksSelector);
  const dispatch = useDispatch();
  const { pageResults } = useSelector(state => state.saved);
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
    </section>
  );
}

export default FilterByNSFW;
