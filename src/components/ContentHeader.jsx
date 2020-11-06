import React from 'react';
import BackButton from './BackButton';
import Search from './Search';

function ContentHeader({ title = 'All Posts', withHistory, ...props }) {
  return (
    <div className="pb-4 w-full max-w-full-sidebar fixed bg-white h-20">
      <div className="flex justify-between items-end h-full">
        {withHistory ? <BackButton /> : null}
        <span className="font-bold text-3xl">{title}</span>
        <Search {...props} />
      </div>
    </div>
  );
}

export default ContentHeader;
