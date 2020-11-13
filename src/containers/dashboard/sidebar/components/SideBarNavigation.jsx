import React from 'react'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'

function SideBarNavigation() {
  return (
    <nav className="flex flex-col justify-center">
      <NavLink
        className="text-center font-medium text-md block border border-gray-300 bg-white rounded hover:border-gray-400 shadow-sm hover:bg-gray-100 py-2 px-4 mb-2"
        activeClassName="text-white text-lg font-bold block border border-blue-500 bg-blue-500 hover:bg-blue-600 shadow-md"
        to="/dashboard/all"
      >
        All
      </NavLink>
      <NavLink
        className="text-center font-medium block border border-gray-300 bg-white rounded hover:border-gray-400 shadow-sm hover:bg-gray-100 py-2 px-4 mb-2"
        activeClassName="text-white text-lg font-bold block border border-blue-500 bg-blue-500 hover:bg-blue-600 shadow-md"
        to="/dashboard/subreddits"
      >
        Subreddits
      </NavLink>
      <NavLink
        className="text-center font-medium block border border-gray-300 bg-white rounded hover:border-gray-400 shadow-sm hover:bg-gray-100 py-2 px-4 mb-2"
        activeClassName="text-white text-lg font-bold block border border-blue-500 bg-blue-500 hover:bg-blue-600 shadow-md"
        to="/dashboard/nsfw"
      >
        NSFW
      </NavLink>
    </nav>
  )
}

export default SideBarNavigation
