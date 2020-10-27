import React from 'react'
import Content from './Content'
import SideBar from './SideBar'

function Dashboard() {
  return (
    <div className="flex w-screen h-screen max-w-full">
      <div className="w-1/12 flex-none">
        <SideBar />
      </div>
      <div className="w-11/12 flex-none">
        <Content />
      </div>
    </div>
  )
}

export default Dashboard
