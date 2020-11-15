import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { refreshSaved, updateToken } from '../../../../redux/actions'

function RefreshButton() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { refresh_token: refreshToken } = useSelector((state) => state.user)

  const requestRefreshToken = () =>
    fetch(`/api/refresh?token=${refreshToken}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          const expires = Date.now() + 3600000
          dispatch(updateToken({ token: data.access_token, expires }))
          history.push('/dashboard')
          dispatch(refreshSaved())
          localStorage.removeItem('saved')
          history.push('/loading')
        }
      })
      .catch((err) => console.log(err))

  return (
    <button
      type="button"
      className="mb-2 bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded"
      onClick={() => requestRefreshToken()}
    >
      Refresh
    </button>
  )
}

export default RefreshButton
