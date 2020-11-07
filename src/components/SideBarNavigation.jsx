import React from 'react'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'

function SideBarNavigation() {
  return (
    <nav className="flex flex-col justify-center">
        <NavLink
          className="text-center font-semibold text-md block border border-white rounded hover:border-gray-200 hover:bg-gray-200 py-2 px-4 mb-2"
          activeClassName="text-white text-lg font-extrabold block border border-blue-500 bg-blue-500 hover:bg-blue-700"
          to="/dashboard/all"
        >
          All
        </NavLink>
        <NavLink
          className="text-center font-semibold block border border-white rounded hover:border-gray-200 hover:bg-gray-200 py-2 px-4 mb-2"
          activeClassName="text-white text-lg font-extrabold block border border-blue-500 bg-blue-500 hover:bg-blue-700"
          to="/dashboard/subreddits"
        >
          Subreddits
        </NavLink>
        <NavLink
          className="text-center font-semibold block border border-white rounded hover:border-gray-200 hover:bg-gray-200 py-2 px-4 mb-2"
          activeClassName="text-white text-lg font-extrabold block border border-blue-500 bg-blue-500 hover:bg-blue-700"
          to="/dashboard/nsfw"
        >
          NSFW
        </NavLink>
      </nav>
  )
}

export default SideBarNavigation
