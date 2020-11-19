import {
  faCompressArrowsAlt,
  faExpandArrowsAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import PropTypes from 'prop-types'

function CollapseExpandButton({ isOpen, setSidebarOpen }) {
  return (
    <button
      type="button"
      className="sign-out mt-12 bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 border-b-4 border-indigo-700 hover:border-indigo-500 rounded"
      onClick={() => setSidebarOpen(!isOpen)}
      title={isOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
    >
      <span className="title">
        <FontAwesomeIcon icon={faCompressArrowsAlt} />
      </span>
      <span className="icon">
        <FontAwesomeIcon icon={faExpandArrowsAlt} />
      </span>
    </button>
  )
}

CollapseExpandButton.propTypes = {
  isOpen: PropTypes.bool,
  setSidebarOpen: PropTypes.func,
}

export default CollapseExpandButton
