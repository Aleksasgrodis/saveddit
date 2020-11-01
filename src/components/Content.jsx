import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AllLinks from './AllLinks'
import AllSubreddits from './AllSubreddits'
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
      </Switch>
    </div>
  )
}

export default Content
