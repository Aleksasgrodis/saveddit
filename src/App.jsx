import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './containers/dashboard/Dashboard'
import Welcome from './containers/homepage/Welcome'
import LoadingScreen from './containers/loadingScreen/LoadingScreen'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Welcome />
        </Route>
        <Route path="/loading">
          <LoadingScreen />
        </Route>
        <ProtectedRoute path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  )
}

export default App
