import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  loadNumberedPage,
  setSearchResults,
  setSubredditFilter,
} from '../../../../redux/actions'
import PaginationNavigation from '../../../../components/PaginationNavigation'
import SavedLinkListItem from '../../../../components/SavedLinkListItem'
import { ComponentContext } from '../../../../context/componentContext'

function FilterBySubreddit() {
  const { subreddit, page } = useParams()
  const dispatch = useDispatch()
  const { pageResults, currentPage, searchPages } = useSelector(
    (state) => state.saved,
  )
  const { setSubredditSearchValue } = useContext(ComponentContext)

  useEffect(() => {
    setSubredditSearchValue('')
    batch(() => {
      dispatch(setSubredditFilter({ subreddit }))
      dispatch(setSearchResults({ value: '' }))
      dispatch(loadNumberedPage({ page: page * 1 || 1 }))
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
