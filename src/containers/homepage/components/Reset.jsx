import React from 'react'

function Reset() {
  const [hasReset, setHasReset] = React.useState(false)
  const reset = () => {
    localStorage.clear()
    setHasReset(true)
  }
  return (
    <h2
      onClick={() => reset()}
      className={`font-bold ${
        hasReset ? 'text-blue-500' : 'text-red-500'
      } outline-none self-center`}
    >
      {hasReset ? 'Try now!' : 'Not working?'}
    </h2>
  )
}

export default Reset
