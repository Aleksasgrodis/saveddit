import {
  faRedditAlien,
  faRedditSquare,
} from '@fortawesome/free-brands-svg-icons';
import {
  faArrowUp,
  faCalendarAlt,
  faCommentAlt,
  faLink,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format, fromUnixTime } from 'date-fns';
import React, { useContext } from 'react';
import TextTruncate from 'react-text-truncate';
import { UserContext } from '../context/UserContext';

function SavedLinkListItem({
  title,
  url,
  permalink,
  score,
  num_comments,
  author,
  created_utc,
  domain,
  over_18,
  subreddit_name_prefixed,
  id,
}) {
  const {
    user: { token },
  } = useContext(UserContext);
  const unsave = id => {
    fetch('/api/unsave', {
      method: 'post',
      body: JSON.stringify({
        id: id,
        token: token,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        // remove from redux on success.
      })
      .catch(err => console.log(err));
  };
  console.log(id);
  return (
    <div className="rounded-md xl:w-5/12 lg:w-10/12 md:w-full sm:w-full w-full flex border shadow-md mb-4 mr-4 md:h-40 sm:h-56 h-56 overflow-hidden">
      <div className="xl:w-1/12 lg:w-1/12 md:w-1/12 sm:w-12 w-12 flex flex-col justify-around bg-gray-900 text-white ">
        <div className="flex flex-col items-center justify-center h-16">
          <FontAwesomeIcon icon={faArrowUp} />
          <span className="sm:text-xs md:text-sm">
            {score > 100000 ? '100K+' : score}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center h-16">
          <FontAwesomeIcon icon={faCommentAlt} />
          <span className="sm:text-xs md:text-sm">{num_comments}</span>
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
                href={`https://www.reddit.com/${subreddit_name_prefixed}`}
              >
                {subreddit_name_prefixed}
              </a>
            </p>
            {over_18 ? (
              <span
                title="NOT SAFE FOR WORK"
                className="text-white bg-red-600 py-px px-1 rounded font-bold text-sm"
              >
                NSFW
              </span>
            ) : null}{' '}
          </div>
          <div className="text-gray-900 font-bold text-md">
            <a
              href={`https://www.reddit.com${permalink}`}
              rel="noopener noreferrer"
              target="_blank"
              className="hover:text-orange-600"
            >
              <TextTruncate
                line={3}
                element="span"
                truncateText="..."
                text={title}
              />
            </a>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <FontAwesomeIcon
              className="text-gray-700 mr-2 text-lg"
              icon={faCalendarAlt}
            />
            <span className="text-gray-600 text-sm">
              Posted on {format(fromUnixTime(created_utc), 'd MMM yyy')} by{' '}
              {author}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 text-sm truncate">{domain}</span>
          </div>
        </div>
      </div>
      <div className="xl:w-1/12 lg:w-1/12 md:w-1/12 sm:w-12 flex flex-col justify-around items-center">
        <a
          href={url}
          rel="noopener noreferrer"
          target="_blank"
          className="w-full h-full outline-none bg-transparent"
        >
          <button className=" w-full h-full rounded bg-transparent text-blue-500 text-2xl">
            <FontAwesomeIcon icon={faLink} />
          </button>
        </a>
        <a
          href={`https://www.reddit.com${permalink}`}
          rel="noopener noreferrer"
          target="_blank"
          className="w-full h-full outline-none"
        >
          <button className="w-full h-full text-orange-500 text-2xl">
            <FontAwesomeIcon icon={faRedditAlien} />
          </button>
        </a>
        <button
          onClick={() => unsave(id)}
          className="w-full h-full outline-none text-red-500 bg-transparent text-2xl"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </div>
  );
}

export default SavedLinkListItem;
