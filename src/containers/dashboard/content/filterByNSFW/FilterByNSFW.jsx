import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ContentHeader from '../../../../components/ContentHeader'
import PaginationNavigation from '../../../../components/PaginationNavigation'
import SavedLinkListItem from '../../../../components/SavedLinkListItem'
import {
  resetNsfwFilter,
  setNsfwFilter,
  setSearchResults,
} from '../../../../redux/actions'

function FilterByNSFW() {
  const dispatch = useDispatch()
  const { pageResults, currentPage, searchPages } = useSelector(
    (state) => state.saved,
  )
  const history = useHistory()

  useEffect(() => {
    dispatch(setNsfwFilter())
    dispatch(setSearchResults({ value: '' }))
    return () => {
      dispatch(resetNsfwFilter())
    }
  }, [dispatch])

  useEffect(() => {
    if (pageResults.length === 0) {
      history.go(-1)
    }
    return () => {}
  }, [pageResults])

  return (
    <section className="w-full">
      <div className="flex flex-wrap justify-center pt-4">
        {pageResults &&
          pageResults.map((link) => (
            <SavedLinkListItem key={link.permalink} {...link} />
          ))}
      </div>
      <PaginationNavigation total={searchPages} currentPage={currentPage} />
    </section>
  )
}

export default FilterByNSFW
