import {
  faRedditAlien,
  faRedditSquare,
} from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUp,
  faCalendarAlt,
  faCommentAlt,
  faLink,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { format, fromUnixTime } from 'date-fns'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextTruncate from 'react-text-truncate'
import PropTypes from 'prop-types'
import { unsavePost } from '../redux/actions'

function SavedLinkListItem({
  title,
  url,
  permalink,
  score,
  numComments,
  createdUtc,
  domain,
  over18,
  subredditNamePrefixed,
  id,
}) {
  const { token } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const unsave = (postID) => {
    fetch('/api/unsave', {
      method: 'post',
      body: JSON.stringify({
        id: postID,
        token,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        dispatch(unsavePost({ id }))
      })
      .catch((err) => console.log(err))
  }
  return (
    <article className="rounded-md bg-white xl:w-5/12 lg:w-10/12 md:w-full sm:w-full w-full flex border border-gray-200 shadow-md hover:shadow-lg mb-4 mr-0 xl:mr-4 sm:h-auto h-auto overflow-hidden">
      <div className="xl:w-1/12 lg:w-1/12 md:w-1/12 sm:w-12 w-12 flex flex-col justify-around bg-gray-900 text-white ">
        <div className="flex flex-col items-center justify-center h-16">
          <FontAwesomeIcon icon={faArrowUp} />
          <span className="sm:text-xs md:text-sm text-xs">
            {score > 100000 ? '100K+' : score}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center h-16">
          <FontAwesomeIcon icon={faCommentAlt} />
          <span className="sm:text-xs md:text-sm text-xs">{numComments}</span>
        </div>
      </div>
      <div className="flex flex-col justify-between"></div>
      <div className="w-10/12 p-4 flex flex-col justify-between">
        <div>
          <div className="flex justify-between align-center">
            <p className="text-sm text-gray-600 flex items-center mb-1">
              <FontAwesomeIcon
                icon={faRedditSquare}
                className="text-xl mr-2 text-orange-600"
              />
              <a
                className="hover:text-gray-900"
                rel="noopener noreferrer"
                target="_blank"
                title={`Open ${subredditNamePrefixed} in a new tab.`}
                href={`https://www.reddit.com/${subredditNamePrefixed}`}
              >
                {subredditNamePrefixed}
              </a>
            </p>
            {over18 && (
              <span
                title="NOT SAFE FOR WORK"
                className="text-white bg-red-600 py-px px-1 rounded font-bold text-sm"
              >
                NSFW
              </span>
            )}
          </div>
          <div className="text-gray-900 font-bold text-md">
            <a
              href={`https://www.reddit.com${permalink}`}
              rel="noopener noreferrer"
              target="_blank"
              className="hover:text-orange-600 text-gray-800"
              title="Open Reddit post in new tab."
            >
              <TextTruncate
                line={3}
                element="h1"
                truncateText="..."
                text={title}
              />
            </a>
          </div>
        </div>
        <div className="flex justify-between pt-2">
          <div className="flex items-center">
            <FontAwesomeIcon
              className="text-gray-700 mr-2 text-lg"
              icon={faCalendarAlt}
            />
            <span className="text-gray-600 text-sm">
              Posted on {format(fromUnixTime(createdUtc), 'd MMM yyy')}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 text-sm truncate">{domain}</span>
          </div>
        </div>
      </div>
      <div className="xl:w-1/12 lg:w-1/12 md:w-1/12 sm:w-12 w-12 flex flex-col justify-around items-center">
        <a
          href={url}
          rel="noopener noreferrer"
          target="_blank"
          title={`Open linked resource in new tab (${domain}).`}
          className="w-full h-full outline-none bg-transparent"
        >
          <button
            type="button"
            className=" w-full h-full rounded bg-transparent text-blue-500 hover:text-white hover:bg-blue-500 text-xl"
          >
            <FontAwesomeIcon icon={faLink} />
          </button>
        </a>
        <a
          href={`https://www.reddit.com${permalink}`}
          rel="noopener noreferrer"
          target="_blank"
          title="Open Reddit post in new tab."
          className="w-full h-full outline-none"
        >
          <button
            type="button"
            className="w-full h-full rounded hover:text-white hover:bg-orange-600 text-orange-500 text-xl"
          >
            <FontAwesomeIcon icon={faRedditAlien} />
          </button>
        </a>
        <button
          type="button"
          title="Remove post from saved posts."
          onClick={() => unsave(id)}
          className="w-full h-full outline-none rounded text-red-500 hover:text-white hover:bg-red-500 bg-transparent text-xl"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </article>
  )
}

SavedLinkListItem.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  permalink: PropTypes.string,
  score: PropTypes.number,
  numComments: PropTypes.number,
  author: PropTypes.string,
  createdUtc: PropTypes.number,
  domain: PropTypes.string,
  over18: PropTypes.bool,
  subredditNamePrefixed: PropTypes.string,
  id: PropTypes.string,
}

export default SavedLinkListItem
