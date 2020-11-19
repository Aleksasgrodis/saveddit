import React, { useEffect } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { setSearchResults, setSubredditFilter } from '../../../../redux/actions'
import PaginationNavigation from '../../../../components/PaginationNavigation'
import SavedLinkListItem from '../../../../components/SavedLinkListItem'

function FilterBySubreddit() {
  const { subreddit } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const { pageResults, currentPage, searchPages } = useSelector(
    (state) => state.saved,
  )

  useEffect(() => {
    batch(() => {
      dispatch(setSubredditFilter({ subreddit }))
      dispatch(setSearchResults({ value: '' }))
    })
    return () => {
      dispatch(setSubredditFilter({ subreddit: null }))
    }
  }, [dispatch, subreddit])

  // useEffect(() => {
  //   if (pageResults.length === 0) {
  //     history.go(-1)
  //   }
  //   return () => {}
  // }, [pageResults])

  return (
    <div>
      <div className="flex flex-wrap justify-center pt-4">
        {pageResults.map((link) => (
          <SavedLinkListItem key={link.permalink} {...link} />
        ))}
      </div>
      <PaginationNavigation total={searchPages} currentPage={currentPage} />
    </div>
  )
}

export default FilterBySubreddit
