import { faReddit, faRedditSquare } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowUp,
  faCalendarAlt,
  faEye,
  faEyeSlash,
  faLink,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format, fromUnixTime } from 'date-fns';
import React from 'react';

function SavedLinkListItem({
  title,
  url,
  permalink,
  score,
  num_comments,
  author,
  clicked,
  created_utc,
  domain,
  over_18,
  subreddit_name_prefixed,
  thumbnail,
}) {
  return (
    <div className="rounded w-3/12 lg:flex mb-2 mr-2"> 
      {/* {thumbnail ? (
        <div
          className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style={{ backgroundImage: `url(${thumbnail})` }}
          title="Reddit post thumbnail."
        ></div>
      ) : (
        <div
          className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style={{ backgroundImage: `url('https://freepikpsd.com/wp-content/uploads/2019/10/image-not-found-png-4-Transparent-Images.png')` }}
          title="Reddit post thumbnail."
        ></div>
      )} */}

      <div className="border border-gray-400 w-full justify-between lg:border-gray-400 bg-white rounded p-4 flex flex-col leading-normal">
        <div className="mb-8">
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
            <span className={`text-${clicked ? 'blue' : 'gray'}-600`}>
              {over_18 ? (
                <span
                  title="NOT SAFE FOR WORK"
                  className="text-red-600 mr-2 font-bold"
                >
                  NSFW
                </span>
              ) : null}{' '}
              <span title={clicked ? 'Viewed' : 'Not Viewed'}>
                <FontAwesomeIcon icon={clicked ? faEye : faEyeSlash} />
              </span>
            </span>
          </div>
          <div className="text-gray-900 font-bold text-xl">
            <a
              href={`https://www.reddit.com${permalink}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              {title}
            </a>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between  mb-4">
            <div className="text-sm flex-col flex items-center w-2/6">
              <span className="text-blue-500 text-xl">
                <FontAwesomeIcon icon={faLink} />
              </span>
              <p className="text-gray-900 leading-none">{domain}</p>
            </div>
            <div className="text-sm flex-col flex items-center w-2/6">
              <span className="text-gray-600 text-xl">
                <FontAwesomeIcon icon={faCalendarAlt} />
              </span>
              <p className="text-gray-900 leading-none">
                {format(fromUnixTime(created_utc), 'd MMM yyy')}
              </p>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm flex-col flex items-center w-2/6">
              <span className="text-orange-600 text-lg">
                <FontAwesomeIcon icon={faArrowUp} />
              </span>
              <p className="text-gray-900 leading-none font-bold">{score}</p>
            </div>
            <div className="text-sm flex-col flex items-center w-2/6">
              <span className="text-green-500 text-lg">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <p className="text-gray-900 leading-none">{author}</p>
            </div>
            {clicked ? (
              <div className="text-sm flex-col flex items-center w-2/6">
                <span className="text-orange-600 text-lg">
                  <FontAwesomeIcon icon={faEye} />
                </span>
              </div>
            ) : null}
          </div>
        </div>
        {/* Buttons to view url or post */}
      </div>
    </div>
  );
}

export default SavedLinkListItem;
