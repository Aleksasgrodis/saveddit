import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { loadNumberedPage } from '../redux/actions'

function PaginationItem({ key, page, currentPage }) {
  const dispatch = useDispatch()
  return (
    <button
      key={key}
      type="button"
      onClick={() => dispatch(loadNumberedPage({ page }))}
      className={`${
        page === currentPage ? 'text-orange-600' : ''
      } -ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
    >
      {page}
    </button>
  )
}
PaginationItem.propTypes = {
  key: PropTypes.string,
  page: PropTypes.number,
  currentPage: PropTypes.number,
}

export default PaginationItem
