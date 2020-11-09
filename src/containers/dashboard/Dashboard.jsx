import React from 'react';
import Content from './content/Content';
import SideBar from './sidebar/SideBar';

function Dashboard() {
  return (
    <div className="flex w-screen max-w-screen h-screen max-w-screen overflow-hidden">
      <div className="flex-none min-w-200 p-3">
        <SideBar />
      </div>
      <div className="w-full max-w-full-sidebar flex-none overflow-y-scroll">
        <Content />
      </div>
    </div>
  );
}

export default Dashboard;
