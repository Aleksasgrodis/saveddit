import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PaginationNavigation from '../../../../components/PaginationNavigation'
import SavedLinkListItem from '../../../../components/SavedLinkListItem'
import { ComponentContext } from '../../../../context/componentContext'
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
  const { setHeadingTitle, setSearchValue, searchValue } = useContext(
    ComponentContext,
  )
  useEffect(() => {
    dispatch(setNsfwFilter())
    dispatch(setSearchResults({ value: '' }))
    return () => {
      dispatch(resetNsfwFilter())
    }
  }, [dispatch])

  // useEffect(() => {
  //   if (pageResults.length === 0 && searchValue !== '') {
  //     history.go(-1)
  //   }
  //   return () => {}
  // }, [pageResults, searchValue])

  useEffect(() => {
    setSearchValue('')
    setHeadingTitle('NSFW Posts')
    return () => {
      setHeadingTitle(null)
    }
  }, [])

  return (
    <section className="w-full">
      <div className="flex flex-wrap justify-center p-5">
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
