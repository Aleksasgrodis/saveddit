import React from 'react';
import { NavLink } from 'react-router-dom';

function SubredditListItem({ title, hits }) {
  return (
    <NavLink
      className="flex w-3/12 h-16 rounded border border-blue-400 m-2"
      to={`/dashboard/subreddits/${title}`}
    >
      <div className="self-center font-medium text-xl text-center flex justify-center">{title}</div>
    </NavLink>
  );
}

export default SubredditListItem;
