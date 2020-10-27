import React from 'react';
import { NavLink } from 'react-router-dom';

function SubredditListItem({ title, hits }) {
  return (
    <NavLink
      className="flex lg:w-2/12 lg:h-16 rounded border border-green-400 m-2"
      to={`/dashboard/subreddits/${title}`}
    >
      <div className="self-center w-full font-medium text-xl text-center">{title}</div>
    </NavLink>
  );
}

export default SubredditListItem;
