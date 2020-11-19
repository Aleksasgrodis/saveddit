import React from 'react'
import { NavHashLink } from 'react-router-hash-link'
import PropTypes from 'prop-types'

function AnchorNavigation({ sortedArray }) {
  return (
    <div className="fixed right-0 inset-y-0 md:mr-12 mr-6">
      <nav className="flex flex-col h-full justify-center items-center">
        {sortedArray.map((letter) =>
          letter[1].length ? (
            <NavHashLink
              key={letter[0]}
              className="font-bold text-gray-400 hover:text-gray-900"
              to={`/dashboard/subreddits#section-${letter[0].toLowerCase()}`}
              scroll={(el) =>
                el.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }
              activeClassName="text-orange-600 text-3xl font-bolder"
            >
              {letter[0]}
            </NavHashLink>
          ) : null,
        )}
      </nav>
    </div>
  )
}

AnchorNavigation.propTypes = {
  sortedArray: PropTypes.array,
}
export default AnchorNavigation
