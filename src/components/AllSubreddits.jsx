import { create } from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import Search from './Search';
import SubredditListItem from './SubredditListItem';

const linksSelector = state => state.saved.links;
const subredditSelector = createSelector(linksSelector, links =>
  links.map(link => link.subreddit),
);

function AllSubreddits() {
  const duplicateSubreddits = useSelector(subredditSelector);
  const subreddits = [...new Set(duplicateSubreddits)].sort((a, b) =>
    a.localeCompare(b),
  );
  return (
    <div className="flex flex-col">
      <div>
        <Search />
      </div>
      <div className="flex flex-wrap w-full">
        {subreddits
          ? subreddits.map(sub => <SubredditListItem key={sub} title={sub} />)
          : null}
      </div>
    </div>
  );
}

export default AllSubreddits;
