import React from 'react'
import Axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const Login = () => {
  const handleAuthorize = () => {
    const seed = uuidv4()
    localStorage.clear()
    localStorage.setItem('seed', seed)
    Axios.post('/api/authorize', {
      seed,
    })
      .then((res) => {
        window.location = res.data.url
      })
      .catch((err) => console.log(err))
  }
  return (
    <div className="flex justify-center">
      <button
        onClick={() => handleAuthorize()}
        type="button"
        className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded text-xl mr-3"
      >
        Authorize
      </button>
    </div>
  )
}

export default Login
