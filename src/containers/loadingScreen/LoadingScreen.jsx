import React, { useEffect } from 'react'
import URLParse from 'url-parse'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  addBatch,
  setLoadingStatus,
  setTokens,
  setUserDetails,
} from '../../redux/actions'

const LoadingScreen = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const { isLoading, total, afterListing, fetchCount } = useSelector(
    (state) => state.saved,
  )

  useEffect(() => {
    const url = new URLParse(window.location, true)
    const seed = localStorage.getItem('seed')
    const fetchUserToken = (code) => {
      if (!user.token) {
        fetch(`/api/token?code=${code}`)
          .then((res) => res.json())
          .then((data) => {
            const expires = Date.now() + 3600000
            dispatch(
              setTokens({
                token: data.access_token,
                refresh_token: data.refresh_token,
                expires,
              }),
            )
            fetchUserName(data.access_token)
          })
          .catch((err) => console.log(err))
      }
    }

    const fetchUserName = (token) => {
      fetch(`/api/username`, {
        method: 'POST',
        body: JSON.stringify({
          token,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(
            setUserDetails({
              name: data.name,
              avatar: data.icon_img,
              account_created: data.created_utc,
              karma: data.total_karma,
              verified: data.verified,
              coins: data.coins,
            }),
          )
        })
        .catch((err) => console.log(err))
    }

    if (url && url.query.state === seed) {
      fetchUserToken(url.query.code)
    }
  }, [user, dispatch])

  useEffect(() => {
    if (user.token && user.name) {
      const fetchSaved = () => {
        fetch(`/api/fetch`, {
          method: 'POST',
          body: JSON.stringify({
            token: user.token,
            username: user.name,
          }),
        })
          .then((res) => res.json())
          .then(({ after, dist, links }) => {
            dispatch(addBatch({ links, count: dist, afterListing: after }))
          })
          .catch((err) => console.log(err))
      }
      fetchSaved()
    }
  }, [user, dispatch])

  useEffect(() => {
    const fetchSaved = async () => {
      fetch(`/api/fetch`, {
        method: 'POST',
        body: JSON.stringify({
          token: user.token,
          username: user.name,
          afterListing,
        }),
      })
        .then((res) => res.json())
        .then(({ after, dist, links }) => {
          dispatch(addBatch({ links, count: dist, afterListing: after }))
        })
        .catch((err) => console.log(err))
    }
    if (afterListing && fetchCount === 100 && isLoading) {
      fetchSaved()
    }
    if (fetchCount < 100) {
      dispatch(setLoadingStatus({ status: false }))
    }
  }, [afterListing, fetchCount, user, dispatch, isLoading])

  if (isLoading === false) {
    return <Redirect to="/dashboard/all" />
  }

  return (
    <div className="container cursor-wait mx-auto h-screen flex flex-col justify-center">
      <div className="self-center font-mono">
        <h2 className="font-bold text-4xl">
          Welcome, {user.name ? user.name : 'redditor.'}.
        </h2>
        <p>
          Please wait while we fetch your saved threads and links, this may take
          a few seconds.
        </p>
        <p>{isLoading ? `Count: ${total}` : 'Done!'}</p>
      </div>
    </div>
  )
}

export default LoadingScreen
