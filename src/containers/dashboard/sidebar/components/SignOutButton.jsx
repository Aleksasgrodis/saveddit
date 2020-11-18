import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { clearState } from '../../../../redux/actions'

function SignOutButton() {
  const dispatch = useDispatch()
  const history = useHistory()

  const signOut = () => {
    dispatch(clearState())
    localStorage.clear()
    history.push('/')
  }

  return (
    <button
      type="button"
      className="sign-out bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
      onClick={() => signOut()}
    >
      <span className="title">Sign Out</span>
      <span className="icon">
        <FontAwesomeIcon icon={faSignOutAlt} />
      </span>
    </button>
  )
}

export default SignOutButton
