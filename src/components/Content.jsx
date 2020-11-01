import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AllLinks from './AllLinks'
import AllSubreddits from './AllSubreddits'
import FilterByNSFW from './FilterByNSFW'
import FilterBySubreddit from './FilterBySubreddit'

function Content() {
  return (
    <div className="w-full">
      <Switch>
        <Route path="/dashboard/all">
          <AllLinks />
        </Route>
        <Route path="/dashboard/categories">
          cata
        </Route>
        <Route exact path="/dashboard/subreddits">
          <AllSubreddits />
        </Route>
        <Route path="/dashboard/subreddits/:subreddit">
          <FilterBySubreddit />
        </Route>
        <Route path="/dashboard/nsfw">
          <FilterByNSFW />
        </Route>
      </Switch>
    </div>
  )
}

export default Content
