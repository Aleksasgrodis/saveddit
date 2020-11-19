import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchResults } from '../redux/actions'
import { ComponentContext } from '../context/componentContext'

function Search() {
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setSearchResults({ value: searchValue }))
  }, [searchValue, dispatch])
  const {
    customSearch,
    subredditSearchValue,
    setSubredditSearchValue,
  } = useContext(ComponentContext)

  return (
    <div className="w-3/6 sm:w-3/6 md:w-2/6 lg:w-4/12 xl:w-2/6 px-3">
      <input
        value={customSearch ? subredditSearchValue : searchValue}
        onChange={(e) =>
          customSearch
            ? setSubredditSearchValue(e.target.value)
            : setSearchValue(e.target.value)
        }
        className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 shadow-md rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        id="search-input"
        type="text"
        placeholder={
          customSearch ? 'Search for subreddit title..' : 'Search for title..'
        }
      />
    </div>
  )
}

export default Search
