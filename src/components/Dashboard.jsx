import React from 'react'
import SideBar from './SideBar'

function Dashboard() {
  return (
    <div className="container flex w-screen h-screen">
      <div className="w-48 border-solid border border-gray-600 flex-none">
        <SideBar />
      </div>
      <div className="border-solid border border-gray-600 w-full flex-none">content</div>
    </div>
  )
}

export default Dashboard
