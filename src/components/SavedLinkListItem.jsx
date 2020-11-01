import { faReddit, faRedditSquare } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowUp,
  faCalendarAlt,
  faEye,
  faLink,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    <div className="rounded w-2/6 min-w-2/6 lg:flex ">
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

      <div className="border-2 border-gray-400 w-full m-2 justify-between lg:border-gray-400 bg-white rounded p-4 flex flex-col leading-normal">
        <div className="mb-8">
          <p className="text-sm text-gray-600 flex items-center mb-1">
            <FontAwesomeIcon
              icon={faRedditSquare}
              className="text-xl mr-2 text-orange-600"
            />
            {subreddit_name_prefixed}
          </p>
          <div className="text-gray-900 font-bold text-xl">{title}</div>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between">
            <div className="text-sm flex-col flex items-center w-2/6">
              <span>
                <FontAwesomeIcon icon={faLink} />
              </span>
              <p className="text-gray-900 leading-none">{domain}</p>
            </div>
            <div className="text-sm flex-col flex items-center w-2/6">
              <span>
                <FontAwesomeIcon icon={faCalendarAlt} />
              </span>
              <p className="text-gray-900 leading-none">{created_utc}</p>
            </div>
            {over_18 ? (
              <div className="text-sm flex-col flex items-center w-2/6">
                <span>{/* <FontAwesomeIcon icon={faLink} /> */}</span>
                <p className="text-gray-900 leading-none">NSFW</p>
              </div>
            ) : null}
          </div>
          <div className="flex justify-between">
            <div className="text-sm flex-col flex items-center w-2/6">
              <span>
                <FontAwesomeIcon icon={faArrowUp} />
              </span>
              <p className="text-gray-900 leading-none">{score}</p>
            </div>
            <div className="text-sm flex-col flex items-center w-2/6">
              <span>
                <FontAwesomeIcon icon={faUser} />
              </span>
              <p className="text-gray-900 leading-none">{author}</p>
            </div>
            {clicked ? (
              <div className="text-sm flex-col flex items-center w-2/6">
                <span>
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
