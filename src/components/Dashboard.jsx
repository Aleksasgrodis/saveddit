import React from 'react'
import Content from './Content'
import SideBar from './SideBar'

function Dashboard() {
  return (
    <div className="flex w-screen max-w-full h-screen max-w-full overflow-hidden">
      <div className="flex-none min-w-200 p-3">
        <SideBar />
      </div>
      <div className="w-11/12 flex-none overflow-y-scroll">
        <Content />
      </div>
    </div>
  )
}

export default Dashboard
