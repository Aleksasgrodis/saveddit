import React from 'react'
import PropTypes from 'prop-types'
import PaginationItem from './PaginationItem'

function PaginationTriplet({ currentPage, total }) {
  return (
    <>
      {currentPage > 4 ? (
        <span className="-ml-px relative inline-flex items-center px-4 py-2 text-sm leading-5 font-medium text-gray-700">
          ...
        </span>
      ) : null}
      {currentPage > 4 ? (
        <PaginationItem page={currentPage - 1} currentPage={currentPage} />
      ) : null}
      <PaginationItem page={currentPage} currentPage={currentPage} />
      {currentPage < total - 3 ? (
        <PaginationItem page={currentPage + 1} currentPage={currentPage} />
      ) : null}
      {currentPage < total - 3 ? (
        <span className="-ml-px relative inline-flex items-center px-4 py-2 text-sm leading-5 font-medium text-gray-700">
          ...
        </span>
      ) : null}
    </>
  )
}

PaginationTriplet.propTypes = {
  currentPage: PropTypes.number,
  total: PropTypes.number,
}

export default PaginationTriplet
