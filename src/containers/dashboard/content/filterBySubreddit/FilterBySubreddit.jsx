import React, { useEffect } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  loadNumberedPage,
  setSearchResults,
  setSubredditFilter,
} from '../../../../redux/actions'
import ContentHeader from '../../../../components/ContentHeader'
import PaginationNavigation from '../../../../components/PaginationNavigation'
import SavedLinkListItem from '../../../../components/SavedLinkListItem'

function FilterBySubreddit() {
  const { subreddit } = useParams()
  const dispatch = useDispatch()
  const { pageResults, currentPage, searchPages, searchTotal } = useSelector(
    (state) => state.saved,
  )

  useEffect(() => {
    batch(() => {
      dispatch(setSubredditFilter({ subreddit: subreddit }))
      dispatch(setSearchResults({ value: '' }))
    })
    return () => {
      dispatch(setSubredditFilter({ subreddit: null }))
    }
  }, [dispatch, subreddit])

  return (
    <div>
      <ContentHeader
        title={`r/${subreddit}`}
        count={searchTotal}
        withSort={true}
      />
      <div className="flex flex-wrap justify-center pt-32">
        {pageResults.map((link) => (
          <SavedLinkListItem key={link.permalink} {...link} />
        ))}
      </div>
      <PaginationNavigation
        total={searchPages}
        action={loadNumberedPage}
        currentPage={currentPage}
      />
    </div>
  )
}

export default FilterBySubreddit
