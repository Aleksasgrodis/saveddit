import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { loadNumberedPage } from '../redux/actions'
import PaginationItem from './PaginationItem'
import PaginationTriplet from './NavigationTriplet'

function PaginationNavigation({ total, currentPage }) {
  const dispatch = useDispatch()
  const pageNumbers = new Array(total).fill(0)
  if (total <= 1) {
    return null
  }
  if (total <= 10) {
    return (
      <div className="flex justify-center">
        <nav className="relative z-0 inline-flex pb-4">
          <button
            type="button"
            disabled={currentPage === 1}
            className={`relative inline-flex items-center px-4 py-4 rounded-l-md text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150 ${
              currentPage === 1 ? 'cursor-not-allowed' : ''
            }`}
            aria-label="Previous"
            onClick={() =>
              dispatch(loadNumberedPage({ page: currentPage - 1 }))
            }
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          {pageNumbers &&
            pageNumbers.map((a, i) => (
              <PaginationItem currentPage={currentPage} page={i + 1} />
            ))}
          <button
            type="button"
            disabled={currentPage === total}
            className={` -ml-px relative inline-flex items-center px-4 py-4 rounded-r-md text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150 ${
              currentPage === total ? 'cursor-not-allowed' : ''
            }`}
            aria-label="Next"
            onClick={() =>
              dispatch(loadNumberedPage({ page: currentPage + 1 }))
            }
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </nav>
      </div>
    )
  }

  if (total > 10) {
    return (
      <div className="flex justify-center pb-2">
        <nav className="relative z-0 inline-flex">
          <button
            type="button"
            disabled={currentPage === 1}
            className={`relative inline-flex items-center px-4 py-4 rounded-l-md text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150 ${
              currentPage === 1 ? 'cursor-not-allowed' : ''
            }`}
            aria-label="Previous"
            onClick={() =>
              dispatch(loadNumberedPage({ page: currentPage - 1 }))
            }
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <PaginationItem page={1} currentPage={currentPage} />
          <PaginationItem page={2} currentPage={currentPage} />
          <PaginationItem page={3} currentPage={currentPage} />
          {currentPage < 4 || currentPage > total - 3 ? (
            <span className="-ml-px relative inline-flex items-center px-4 py-2 text-sm leading-5 font-medium text-gray-700">
              ...
            </span>
          ) : (
            <PaginationTriplet currentPage={currentPage} total={total} />
          )}
          <PaginationItem page={total - 2} currentPage={currentPage} />
          <PaginationItem page={total - 1} currentPage={currentPage} />
          <PaginationItem page={total} currentPage={currentPage} />
          <button
            type="button"
            disabled={currentPage === total}
            className={`${
              currentPage === total ? 'cursor-not-allowed' : ''
            } -ml-px relative inline-flex items-center px-4 py-4 rounded-r-md text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150`}
            aria-label="Next"
            onClick={() =>
              dispatch(loadNumberedPage({ page: currentPage + 1 }))
            }
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </nav>
      </div>
    )
  }
}

PaginationNavigation.propTypes = {
  total: PropTypes.number,
  currentPage: PropTypes.number,
}

export default PaginationNavigation
