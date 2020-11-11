import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSortingMethod } from '../redux/actions';

function SortingDropdown() {
  const dispatch = useDispatch();
  return (
    <div className="w-3/6 sm:w-3/6 md:w-2/6 lg:w-2/12 xl:w-1/6 px-3 mr-4">
      {/* <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor="sort-select"
      >
        Sort By
      </label> */}
      <div className="relative">
        <select
          onChange={e => {
            dispatch(setSortingMethod({ method: e.target.value }));
          }}
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="sort-select"
          defaultValue=""
        >
          <option value="" disabled>Sort by</option>
          <option value="lastSaved">Last Saved</option>
          <option value="a-z">Title: A - Z</option>
          <option value="z-a">Title: Z - A</option>
          <option value="dateNew">Date: New - Old</option>
          <option value="dateOld">Date: Old - New</option>
          <option value="popularity">Popularity</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <FontAwesomeIcon icon={faChevronDown} size="xs" />
        </div>
      </div>
    </div>
  );
}

export default SortingDropdown;
