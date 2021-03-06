import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { name, token } = useSelector((state) => state.user)
  return (
    <Route
      {...rest}
      render={(props) =>
        name && token ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  )
}

ProtectedRoute.propTypes = {
  component: PropTypes.elementType,
}

export default ProtectedRoute
