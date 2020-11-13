import React from 'react'
import { useHistory } from 'react-router-dom'

function BackButton() {
  const history = useHistory()
  return (
    <button
      type="button"
      onClick={() => history.go(-1)}
      className="bg-gray-500 shadow-inner hover:bg-gray-700 text-white text-2xl font-bold py-1 px-4 rounded-lg mr-5 focus:outline-none focus:shadow-outline"
    >
      ←
    </button>
  )
}

export default BackButton
