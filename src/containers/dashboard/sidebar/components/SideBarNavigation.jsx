import React from 'react'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'

function SideBarNavigation() {
  return (
    <nav className="flex flex-col justify-center">
        <NavLink
          className="text-center font-semibold text-md block border border-gray-200 bg-gray-200 rounded hover:border-gray-400 hover:bg-gray-300 py-2 px-4 mb-2"
          activeClassName="text-white text-lg font-extrabold block border border-blue-500 bg-blue-500 hover:bg-blue-600"
          to="/dashboard/all"
        >
          All
        </NavLink>
        <NavLink
          className="text-center font-semibold block border border-gray-200 bg-gray-200 rounded hover:border-gray-400 hover:bg-gray-300 py-2 px-4 mb-2"
          activeClassName="text-white text-lg font-extrabold block border border-blue-500 bg-blue-500 hover:bg-blue-600"
          to="/dashboard/subreddits"
        >
          Subreddits
        </NavLink>
        <NavLink
          className="text-center font-semibold block border border-gray-200 bg-gray-200 rounded hover:border-gray-400 hover:bg-gray-300 py-2 px-4 mb-2"
          activeClassName="text-white text-lg font-extrabold block border border-blue-500 bg-blue-500 hover:bg-blue-600"
          to="/dashboard/nsfw"
        >
          NSFW
        </NavLink>
      </nav>
  )
}

export default SideBarNavigation