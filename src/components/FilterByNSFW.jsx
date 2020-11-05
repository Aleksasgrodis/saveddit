import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import SavedLinkListItem from './SavedLinkListItem';

const linksSelector = state => state.saved.links;
const subredditLinksSelector = createSelector(linksSelector, links =>
  links.filter(link => link.over_18),
);

function FilterByNSFW() {
  const filteredPosts = useSelector(subredditLinksSelector);
  return (
    <div className="flex flex-wrap justify-center">
      {filteredPosts
        ? filteredPosts.map(link => (
            <SavedLinkListItem key={link.permalink} {...link} />
          ))
        : null}
    </div>
  );
}

export default FilterByNSFW;
