import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateToken } from '../../redux/actions'
import Content from './content/Content'
import SideBar from './sidebar/SideBar'

function Dashboard() {
  const { expires, refresh_token: refreshToken } = useSelector(
    (state) => state.user,
  )
  const dispatch = useDispatch()

  useEffect(() => {
    const date = Date.now()
    if (date > expires) {
      fetch(`/api/refresh?token=${refreshToken}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.access_token) {
            const newExpires = Date.now() + 3600000
            dispatch(
              updateToken({ token: data.access_token, expires: newExpires }),
            )
          }
        })
        .catch((err) => console.log(err))
    }
    return () => {}
  }, [])
  return (
    <div className="flex w-screen max-w-screen h-screen max-w-screen overflow-hidden">
      <div className="flex-none min-w-200 p-3 bg-gray-100">
        <SideBar />
      </div>
      <div className="w-full max-w-full-sidebar flex-none overflow-y-scroll bg-gray-100">
        <Content />
      </div>
    </div>
  )
}

export default Dashboard
