import React from 'react'
import { animated } from 'react-spring'
import PropTypes from 'prop-types'
import CollapseExpandButton from './components/CollapseExpandButton'
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
        <CollapseExpandButton isOpen={isOpen} setSidebarOpen={setSidebarOpen} />
      </div>
    </animated.div>
  )
}

SideBar.propTypes = {
  isOpen: PropTypes.bool,
  setSidebarOpen: PropTypes.func,
}

export default SideBar
