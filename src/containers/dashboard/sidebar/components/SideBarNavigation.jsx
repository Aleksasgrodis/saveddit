import { faList, faSortAlphaDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'

function SideBarNavigation() {
  return (
    <nav className="flex flex-col justify-center navigation">
      <NavLink
        className="hover:shadow-inner text-center font-medium text-md block border border-gray-300 bg-white rounded hover:border-gray-400 shadow-sm hover:bg-gray-100 py-2 px-4 mb-2"
        activeClassName="text-white text-lg font-bold block border border-blue-500 bg-blue-500 hover:bg-blue-600 shadow-md"
        to="/dashboard/all"
      >
        <span className="route-name">All</span>
        <span className="icon">
          <FontAwesomeIcon icon={faList} />
        </span>
      </NavLink>
      <NavLink
        className="hover:shadow-inner text-center font-medium block border border-gray-300 bg-white rounded hover:border-gray-400 shadow-sm hover:bg-gray-100 py-2 px-4 mb-2"
        activeClassName="text-white text-lg font-bold block border border-blue-500 bg-blue-500 hover:bg-blue-600 shadow-md"
        to="/dashboard/subreddits"
      >
        <span className="route-name">Subreddits </span>
        <span className="icon">
          <FontAwesomeIcon icon={faSortAlphaDown} />
        </span>
      </NavLink>
      <NavLink
        className="hover:shadow-inner text-center font-medium block border border-gray-300 bg-white rounded hover:border-gray-400 shadow-sm hover:bg-gray-100 py-2 px-4 mb-2"
        activeClassName="text-white text-lg font-bold block border border-blue-500 bg-blue-500 hover:bg-blue-600 shadow-md"
        to="/dashboard/nsfw"
      >
        <span className="route-name">NSFW </span>
        <span className="icon">18+</span>
      </NavLink>
    </nav>
  )
}

export default SideBarNavigation
