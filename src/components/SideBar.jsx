import { faChevronDown, faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import exportFromJSON from 'export-from-json';
import React from 'react';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { refreshSaved } from '../redux/actions';
import SideBarNavigation from './SideBarNavigation';
import UserInfo from './UserInfo';

function SideBar() {
  const {
    user: { refresh_token },
    setUser,
    user,
  } = useContext(UserContext);
  let history = useHistory();
  const signOut = () => {
    localStorage.clear();
    history.push('/');
  };
  const dispatch = useDispatch();
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
  const {
    links,
    subredditFilter,
    searchResults,
    pageResults,
    currentPage,
    searchPages,
    total,
  } = useSelector(state => state.saved);

  const exportAsXLS = event => {
    const exportType = 'xls';
    let fileName = 'spreadsheet';
    let data = [];
    switch (event.target.value) {
      case 'page':
        fileName = `Page${currentPage}of${searchPages}`;
        data = pageResults;
        exportFromJSON({ data, fileName, exportType });
        break;
      case 'subreddit':
        fileName = `ResultsFrom-r/${subredditFilter}`;
        data = searchResults;
        exportFromJSON({ data, fileName, exportType });
        break;
      case 'everything':
        fileName = `AllSavedPosts(${total})`;
        data = links;
        exportFromJSON({ data, fileName, exportType });
        break;
      default:
        break;
    }
    event.target.value = "";
  };

  return (
    <div className="flex flex-col justify-around h-screen w-full">
      <div>
        <UserInfo />
      </div>
      <SideBarNavigation />
      <div className="flex flex-col">
        <div className="relative">
          <select
            onChange={e => {
              exportAsXLS(e);
            }}
            className="mb-2 font-bold text-white block appearance-none w-full bg-blue-500 py-3 px-4 pr-8 rounded border-b-4 border-blue-700 leading-tight focus:outline-none"
          >
            <option value="" disabled selected>
              Export Excel Sheet
            </option>
            <option value="page">Current Page</option>
            { subredditFilter && <option value="subreddit">Selected Subreddit</option>}
            <option value="everything">Everything</option>
          </select>
          <div className="pointer-events-none mb-3 mr-1 absolute inset-y-0 right-0 flex items-center px-1 text-white">
            <FontAwesomeIcon icon={faDownload} size="md" />
          </div>
        </div>
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
