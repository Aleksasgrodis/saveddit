import React from 'react'
import PropTypes from 'prop-types'
import BackButton from './BackButton'
import Search from './Search'
import SortingDropdown from './SortingDropdown'

function ContentHeader({
  title = 'All Posts',
  count,
  withHistory,
  withSort,
  ...props
}) {
  return (
    <header className="sticky top-0 w-full p-5 shadow-sm bg-gray-100">
      <div className="w-full relative">
        <div className="flex justify-between items-center items-end h-full">
          {withHistory && <BackButton />}
          <h2 className="font-bold text-lg sm:text-xl md:text-3xl text-gray-900">
            {title} {count && `(${count})`}
          </h2>
          <Search {...props} />
          {withSort && <SortingDropdown />}
        </div>
      </div>
    </header>
  )
}

ContentHeader.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
  withHistory: PropTypes.bool,
  withSort: PropTypes.bool,
}

export default ContentHeader
