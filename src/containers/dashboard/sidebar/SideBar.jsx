import React from 'react';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';
import { clearState, refreshSaved } from '../../../redux/actions';
import ExportAsXlsSelect from './components/ExportAsXlsSelect';
import SideBarNavigation from './components/SideBarNavigation';
import UserInfo from './components/UserInfo';

function SideBar() {
  const {
    user: { refresh_token },
    setUser,
    user,
  } = useContext(UserContext);
  let history = useHistory();
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(clearState());
    localStorage.clear();
    history.push('/');
  };
  const requestRefreshToken = () => {
    return fetch(`/api/refresh?token=${refresh_token}`)
      .then(res => res.json())
      .then(data => {
        if (data.access_token) {
          setUser({ ...user, token: data.access_token });
          history.push('/dashboard');
          dispatch(refreshSaved());
          localStorage.removeItem('saved');
          history.push('/loading');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="flex flex-col justify-around h-screen w-full">
      <div>
        <UserInfo />
      </div>
      <SideBarNavigation />
      <div className="flex flex-col">
        <ExportAsXlsSelect />
        <button
          type="button"
          className="mb-2 bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded"
          onClick={() => requestRefreshToken()}
        >
          Refresh
        </button>
        <button
          type="button"
          className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
