import React, { useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { useDispatch, useSelector } from 'react-redux'
import { updateToken } from '../../redux/actions'
import Content from './content/Content'
import SideBar from './sidebar/SideBar'
import ContentHeader from '../../components/ContentHeader'

function Dashboard() {
  const { expires, refresh_token: refreshToken } = useSelector(
    (state) => state.user,
  )
  const dispatch = useDispatch()
  const [sidebarOpen, setSidebarOpen] = React.useState(true)

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
    <div className="flex w-screen max-w-screen h-screen max-w-screen overflow-hidden">
      <animated.div
        className="flex-none p-3 bg-gray-100 sidebar-wrapper"
        style={rightMenuAnimation}
      >
        <SideBar isOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </animated.div>
      <div
        className={`w-full ${
          sidebarOpen ? 'max-w-full-sidebar' : 'w-screen'
        } flex-none overflow-y-scroll bg-gray-100`}
      >
        <div className="flex flex-col">
          <ContentHeader withSort count={100} />

          <Content />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
