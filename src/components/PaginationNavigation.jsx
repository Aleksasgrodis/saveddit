import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'
import { loadNumberedPage } from '../redux/actions'

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
            className={`relative inline-flex items-center px-4 py-4 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150 ${
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
              <button
                type="button"
                key={uuid()}
                onClick={() => dispatch(loadNumberedPage({ page: i + 1 }))}
                className={`${
                  currentPage === total ? 'cursor-not-allowed' : ''
                } ${
                  i + 1 === currentPage ? 'text-orange-600' : ''
                } -ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
              >
                {i + 1}
              </button>
            ))}
          <button
            type="button"
            disabled={currentPage === total}
            className={` -ml-px relative inline-flex items-center px-4 py-4 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150 ${
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
      <div className="flex justify-center">
        <nav className="relative z-0 inline-flex">
          <button
            type="button"
            disabled={currentPage === 1}
            className={`relative inline-flex items-center px-4 py-4 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150 ${
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
            pageNumbers.map((a, i) => {
              if (i <= 2) {
                return (
                  <button
                    key={uuid()}
                    type="button"
                    onClick={() => dispatch(loadNumberedPage({ page: i + 1 }))}
                    className={`${
                      i + 1 === currentPage ? 'text-orange-600' : ''
                    } -ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
                  >
                    {i + 1}
                  </button>
                )
              }
              if (i === 2 || i === total - 5) {
                return (
                  <span
                    key={uuid()}
                    className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700"
                  >
                    ...
                  </span>
                )
              }
              if (i > total - 4) {
                return (
                  <button
                    type="button"
                    key={uuid()}
                    onClick={() => dispatch(loadNumberedPage({ page: i + 1 }))}
                    className={`${
                      i + 1 === currentPage ? 'text-orange-600' : ''
                    } -ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
                  >
                    {i + 1}
                  </button>
                )
              }
              // if (currentPage === 4) {
              //   return (
              //     <button
              //       type="button"
              //       key={uuid()}
              //       onClick={() => dispatch(loadNumberedPage({ page: i + 1 }))}
              //       className={`${
              //         i + 1 === currentPage ? 'text-orange-600' : ''
              //       } -ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
              //     >
              //       {i + 1}
              //     </button>
              //   )
              // }
            })}
          <button
            type="button"
            disabled={currentPage === total}
            className={`${
              currentPage === total ? 'cursor-not-allowed' : ''
            } -ml-px relative inline-flex items-center px-4 py-4 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150`}
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
