import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom'
import { loadNumberedPage } from '../redux/actions'

function PaginationItem({ page, currentPage }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const { pathname } = useLocation()
  const path = pathname.split('/').slice(1, 3).join('/')
  return (
    <button
      type="button"
      onClick={() => {
        dispatch(loadNumberedPage({ page }))
        history.push(`/${path}/${page}`)
      }}
      className={`${
        page === currentPage ? 'text-blue-600' : ''
      } -ml-px relative inline-flex items-center px-4 py-2 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
    >
      {page}
    </button>
  )
}
PaginationItem.propTypes = {
  page: PropTypes.number,
  currentPage: PropTypes.number,
}

export default PaginationItem
