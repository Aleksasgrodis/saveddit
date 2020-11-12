import React from 'react';
import { useDispatch } from 'react-redux';
import { clearState } from '../../../../redux/actions';
import { useHistory } from 'react-router-dom';

function SignOutButton() {
  const dispatch = useDispatch();
  const history = useHistory();

  const signOut = () => {
    dispatch(clearState());
    localStorage.clear();
    history.push('/');
  };

  return (
    <button
      type="button"
      className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
}

export default SignOutButton;
