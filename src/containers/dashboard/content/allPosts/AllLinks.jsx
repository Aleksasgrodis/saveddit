import React, { useContext, useEffect } from 'react'
import { batch, useDispatch, useSelector } from 'react-redux'
import { loadNumberedPage, setSearchResults } from '../../../../redux/actions'
import PaginationNavigation from '../../../../components/PaginationNavigation'
import SavedLinkListItem from '../../../../components/SavedLinkListItem'
import { ComponentContext } from '../../../../context/componentContext'

function AllLinks() {
  const dispatch = useDispatch()
  const { setSearchValue } = useContext(ComponentContext)

  useEffect(() => {
    setSearchValue('')
    batch(() => {
      dispatch(loadNumberedPage({ page: 1 }))
      dispatch(setSearchResults({ value: '' }))
    })
  }, [dispatch])

  const { pageResults, currentPage, searchPages } = useSelector(
    (state) => state.saved,
  )
  return (
    <section className="w-full">
      <div className="flex flex-wrap justify-center p-5">
        {pageResults.map((link) => (
          <SavedLinkListItem key={link.permalink} {...link} />
        ))}
      </div>
      <PaginationNavigation total={searchPages} currentPage={currentPage} />
    </section>
  )
}

export default AllLinks
