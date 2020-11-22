import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
function SubredditListItem({ title }) {
  return (
    <NavLink
      className="flex h-16 rounded border-2 bg-white border-blue-600 mr-4 mb-4 hover:bg-blue-600 hover:text-white hover:border-blue-600"
      to={`/dashboard/${title}`}
    >
      <div className="pl-6 pr-6 self-center w-full  font-medium xl:text-xl lg:text-md text-center">
        {title}
      </div>
    </NavLink>
  )
}

SubredditListItem.propTypes = {
  title: PropTypes.string,
}

export default SubredditListItem
