import React, { useEffect, useState } from 'react'
import { useSpring, animated } from 'react-spring'
import { useDispatch, useSelector } from 'react-redux'
import { updateToken } from '../../redux/actions'
import Content from './content/Content'
import SideBar from './sidebar/SideBar'
import ContentHeader from '../../components/ContentHeader'
import { ComponentContext } from '../../context/componentContext'

function Dashboard() {
  const {
    user: { expires, refresh_token: refreshToken },
  } = useSelector((state) => state)
  const dispatch = useDispatch()
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const [headingTitle, setHeadingTitle] = useState('All Posts')
  const [headingSort, setHeadingSort] = useState(true)
  const [customSearch, setCustomSearch] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [subredditSearchValue, setSubredditSearchValue] = useState('')
  const contextValues = {
    headingTitle,
    setHeadingTitle,
    headingSort,
    setHeadingSort,
    subredditSearchValue,
    setSubredditSearchValue,
    customSearch,
    setCustomSearch,
    searchValue,
    setSearchValue,
  }

  const rightMenuAnimation = useSpring({
    width: sidebarOpen ? '220px' : '80px',
    transform: sidebarOpen ? `translateX(0)` : `translateX(100%)`,
  })

  useEffect(() => {
    const date = Date.now()
    if (date > expires) {
      fetch(`/api/refresh?token=${refreshToken}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(
            updateToken({ token: data.access_token, expires: date + 3600000 }),
          )
        })
        .catch((err) => console.log(err))
    }
    return () => {}
  }, [dispatch, refreshToken, expires])

  return (
    <ComponentContext.Provider value={contextValues}>
      <div className="flex w-screen max-w-screen h-screen max-w-screen overflow-hidden">
        <animated.div
          className="flex-none p-3 bg-gray-100 sidebar-wrapper"
          style={rightMenuAnimation}
        >
          <SideBar isOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </animated.div>
        <div className="w-full overflow-y-scroll bg-gray-100">
          <ContentHeader withSort />
          <Content />
        </div>
      </div>
    </ComponentContext.Provider>
  )
}

export default Dashboard
