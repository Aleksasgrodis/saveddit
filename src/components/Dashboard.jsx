import React from 'react'
import Content from './Content'
import SideBar from './SideBar'

function Dashboard() {
  return (
    <div className="container flex w-screen h-screen">
      <div className="w-48 flex-none">
        <SideBar />
      </div>
      <div className="w-full flex-none">
        <Content />
      </div>
    </div>
  )
}

export default Dashboard
