import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AllLinks from './allPosts/AllLinks';
import AllSubreddits from './allSubreddits/AllSubreddits';
import FilterByNSFW from './filterByNSFW/FilterByNSFW';
import FilterBySubreddit from './filterBySubreddit/FilterBySubreddit';

function Content() {
  return (
    <div className="">
      <Switch>
        <Route path="/dashboard/all">
          <AllLinks />
        </Route>
        <Route path="/dashboard/categories">cata</Route>
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
  );
}

export default Content;
