import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AllSubreddits from './AllSubreddits'

function Content() {
  return (
    <div className="pl-12">
      <Switch>
        <Route path="/dashboard/all">
          all
        </Route>
        <Route path="/dashboard/categories">
          cata
        </Route>
        <Route path="/dashboard/subreddits">
          <AllSubreddits />
        </Route>
      </Switch>
    </div>
  )
}

export default Content
