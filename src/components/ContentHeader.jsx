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
    <header className="pb-4 w-full max-w-full-sidebar fixed  h-20 bg-gray-100">
      <div className="flex justify-between items-end h-full">
        {withHistory && <BackButton />}
        <h2 className="font-bold text-lg sm:text-xl md:text-3xl text-gray-900 pl-2">
          {title} {count && `(${count})`}
        </h2>
        <Search {...props} />
        {withSort && <SortingDropdown />}
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
