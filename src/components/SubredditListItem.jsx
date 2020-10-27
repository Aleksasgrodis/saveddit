import React from 'react';
import { NavLink } from 'react-router-dom';

function SubredditListItem({ title, hits }) {
  return (
    <NavLink
      className="flex h-16 rounded border-2 border-gray-300 m-2"
      to={`/dashboard/subreddits/${title}`}
    >
      <div className="pl-6 pr-6 self-center w-full font-medium xl:text-xl lg:text-md text-center text-gray-800">{title}</div>
    </NavLink>
  );
}

export default SubredditListItem;
