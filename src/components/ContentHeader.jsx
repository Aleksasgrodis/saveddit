import React from 'react';
import BackButton from './BackButton';
import Search from './Search';
import SortingDropdown from './SortingDropdown';

function ContentHeader({ title = 'All Posts', withHistory, withSort, ...props }) {
  return (
    <header className="pb-4 w-full max-w-full-sidebar fixed bg-white h-24">
      <div className="flex justify-between items-end h-full">
        {withHistory ? <BackButton /> : null}
        <h2 className="font-bold text-lg sm:text-xl md:text-3xl">{title}</h2>
        <Search {...props} />
        {withSort ? <SortingDropdown /> : null}
      </div>
    </header>
  );
}

export default ContentHeader;
