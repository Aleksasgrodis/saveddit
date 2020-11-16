import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from './components/Login'
import PreviewImage from '../../assets/images/preview.png'

function Welcome() {
  const {
    user: { name, refresh_token: refreshToken, token },
    saved: { links },
  } = useSelector((state) => state)
  if (name && refreshToken && token && links.length)
    return <Redirect to="/dashboard/all" />
  return (
    <div className="w-9/12 lg:mx-auto flex">
      <div className="w-5/12 flex h-screen flex-col justify-center">
        <div className="container flex flex-col justify-between reddit-font welcome-details text-gray-800">
          <div className="relative font-bold h-40">
            <div className="text-6xl">Saveddit</div>
            <div className="relative subtitle text-2xl">Reddit Manager</div>
          </div>
          <div className="font-medium text-lg h-32">
            <p>Search, filter, sort, export, unsave.</p>
            <p>Blazingly fast.</p>
          </div>
          <div className="container flex">
            <Login />
          </div>
        </div>
      </div>
      <div className="container h-screen flex flex-col justify-center">
        <img src={PreviewImage} alt="dashboard of product" />
      </div>
    </div>
  )
}

export default Welcome
