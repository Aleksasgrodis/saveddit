import {
  faCompressArrowsAlt,
  faExpandArrowsAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { animated } from 'react-spring'
import ExportAsXlsSelect from './components/ExportAsXlsSelect'
import RefreshButton from './components/RefreshButton'
import SideBarNavigation from './components/SideBarNavigation'
import SignOutButton from './components/SignOutButton'
import UserInfo from './components/UserInfo'

function SideBar({ isOpen, setSidebarOpen }) {
  return (
    <animated.div
      className={`sidebar ${
        !isOpen && 'closed'
      } flex flex-col justify-around h-screen w-full`}
    >
      <div>
        <UserInfo />
      </div>
      <SideBarNavigation />
      <div className="actions flex flex-col">
        <ExportAsXlsSelect />
        <RefreshButton />
        <SignOutButton />
        <button
          type="button"
          className="sign-out mt-12 bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 border-b-4 border-indigo-700 hover:border-indigo-500 rounded"
          onClick={() => setSidebarOpen(!isOpen)}
        >
          <span className="title">
            {' '}
            <FontAwesomeIcon icon={faCompressArrowsAlt} />
          </span>
          <span className="icon">
            <FontAwesomeIcon icon={faExpandArrowsAlt} />
          </span>
        </button>
      </div>
    </animated.div>
  )
}

export default SideBar
