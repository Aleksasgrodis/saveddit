import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { refreshSaved, updateToken } from '../../../redux/actions';
import ExportAsXlsSelect from './components/ExportAsXlsSelect';
import RefreshButton from './components/RefreshButton';
import SideBarNavigation from './components/SideBarNavigation';
import SignOutButton from './components/SignOutButton';
import UserInfo from './components/UserInfo';

function SideBar() {
  return (
    <div className="flex flex-col justify-around h-screen w-full">
      <div>
        <UserInfo />
      </div>
      <SideBarNavigation />
      <div className="flex flex-col">
        <ExportAsXlsSelect />
        <RefreshButton />
        <SignOutButton />
      </div>
    </div>
  );
}

export default SideBar;
