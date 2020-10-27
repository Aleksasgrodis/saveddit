import { create } from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import SubredditListItem from './SubredditListItem'

const linksSelector = state => state.saved.links
const subredditSelector = createSelector(
  linksSelector,
  links => links.map(link => link.subreddit)
)

function AllSubreddits() {
  const duplicateSubreddits = useSelector(subredditSelector);
  const subreddits = [...new Set(duplicateSubreddits)].sort((a, b) => a.localeCompare(b));
  return (
    <div className="flex flex-wrap w-full justify-center">
      
      {subreddits ? subreddits.map(sub => (<SubredditListItem key={sub} title={sub} />)) : null }
    </div>
  )
}

export default AllSubreddits
