import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AllLinks from './allPosts/AllLinks'
import AllSubreddits from './allSubreddits/AllSubreddits'
import FilterByNSFW from './filterByNSFW/FilterByNSFW'
import FilterBySubreddit from './filterBySubreddit/FilterBySubreddit'

function Content() {
  return (
    <div className="">
      <Switch>
        <Route exact path="/dashboard/all">
          <AllLinks />
        </Route>
        <Route path="/dashboard/all/:page">
          <AllLinks />
        </Route>
        <Route exact path="/dashboard/subreddits">
          <AllSubreddits />
        </Route>
        <Route exact path="/dashboard/:subreddit">
          <FilterBySubreddit />
        </Route>
        <Route path="/dashboard/:subreddit/:page">
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
