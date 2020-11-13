import React from 'react'
import { NavLink } from 'react-router-dom'

function SubredditListItem({ title, hits }) {
  return (
    <NavLink
      className="flex h-16 rounded border-2 border-orange-600 mr-4 mb-4 text-gray-900 hover:bg-orange-600 hover:text-white hover:border-orange-600"
      to={`/dashboard/subreddits/${title}`}
    >
      <div className="pl-6 pr-6 self-center w-full font-medium xl:text-xl lg:text-md text-center">
        {title}
      </div>
    </NavLink>
  )
}

export default SubredditListItem
