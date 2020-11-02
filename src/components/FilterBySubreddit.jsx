import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createSelector } from 'reselect';
import SavedLinkListItem from './SavedLinkListItem';
import SortingDropdown from './SortingDropdown';

const linksSelector = state => state.saved.links;
const subredditLinksSelector = subreddit =>
  createSelector(linksSelector, links =>
    links.filter(
      link => link.subreddit.toLowerCase() === subreddit.toLowerCase(),
    ),
  );

function FilterBySubreddit() {
  const { subreddit } = useParams();
  const filteredPosts = useSelector(subredditLinksSelector(subreddit));
  return (
    <div className="flex flex-wrap justify-center">
      <SortingDropdown/>
      {filteredPosts
        ? filteredPosts.map(link => (
            <SavedLinkListItem key={link.permalink} {...link} />
          ))
        : null}
    </div>
  );
}

export default FilterBySubreddit;
