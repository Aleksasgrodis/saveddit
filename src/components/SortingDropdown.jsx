import React from 'react'

function SortingDropdown({sortBy}) {
  return (
      <select onChange={e => {
        console.log('onchange ran')
        sortBy(e.target.value)}} className="focus:opacity-100 h-10 pt-1 pb-1 pl-3 shadow-inner bg-gray-500 text-white text-2xl rounded-lg placeholder-white focus:outline-none focus:shadow-outline" name="" id="">
        <option value="lastSaved">Last Saved</option>
        <option value="a-z">Title: A - Z</option>
        <option value="z-a">Title: Z - A</option>
        <option value="dateNew">Date: New - Old</option>
        <option value="dateOld">Date: Old - New</option>
        <option value="popularity">Popularity</option>
      </select>
  )
}

export default SortingDropdown
