import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';

function PaginationNavigation({ action, total, currentPage }) {
  const dispatch = useDispatch();
  const pageNumbers = new Array(total).fill(0);
  if (total <= 10) {
    return (
      <div className="flex justify-center">
        <nav className="relative z-0 inline-flex shadow-sm pb-4">
          <button
            disabled={currentPage === 1 ? true : false}
            className={`relative inline-flex items-center px-4 py-4 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150 ${
              currentPage === 1 ? 'cursor-not-allowed' : ''
            }`}
            aria-label="Previous"
            onClick={() => dispatch(action({ page: currentPage - 1 }))}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          {pageNumbers
            ? pageNumbers.map((a, i) => (
                <button
                  key={i}
                  onClick={() => dispatch(action({ page: i + 1 }))}
                  className={`${
                    currentPage === total ? 'cursor-not-allowed' : ''
                  } -ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
                >
                  {i + 1}
                </button>
              ))
            : null}
          <button
            disabled={currentPage === total ? true : false}
            className={` -ml-px relative inline-flex items-center px-4 py-4 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150`}
            aria-label="Next"
            onClick={() => dispatch(action({ page: currentPage + 1 }))}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </nav>
      </div>
    );
  }

  if (total > 10) {
    return (
      <div className="flex justify-center">
        <nav className="relative z-0 inline-flex shadow-sm">
          <button
            disabled={currentPage === 1 ? true : false}
            className={`relative inline-flex items-center px-4 py-4 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150 ${
              currentPage === 1 ? 'cursor-not-allowed' : ''
            }`}
            aria-label="Previous"
            onClick={() => dispatch(action({ page: currentPage - 1 }))}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          {pageNumbers
            ? pageNumbers.map((a, i) => {
                if (i <= 2) {
                  return (
                    <button
                      key={i}
                      onClick={() => dispatch(action({ page: i + 1 }))}
                      className={`${
                        i + 1 === currentPage ? 'text-orange-600' : ''
                      } -ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
                    >
                      {i + 1}
                    </button>
                  );
                } else if (i === 2 || i === total - 5) {
                  return (
                    <span
                      key={Date.now()}
                      className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700"
                    >
                      ...
                    </span>
                  );
                } else if (i > total - 4) {
                  return (
                    <button
                      key={i}
                      onClick={() => dispatch(action({ page: i + 1 }))}
                      className={`${
                        i + 1 === currentPage ? 'text-orange-600' : ''
                      } -ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
                    >
                      {i + 1}
                    </button>
                  );
                }
              })
            : null}
          <button
            disabled={currentPage === total ? true : false}
            className={`${
              currentPage === total ? 'cursor-not-allowed' : ''
            } -ml-px relative inline-flex items-center px-4 py-4 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150`}
            aria-label="Next"
            onClick={() => dispatch(action({ page: currentPage + 1 }))}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </nav>
      </div>
    );
  }
}

export default PaginationNavigation;
