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
    <div className="rounded w-3/6 lg:flex">
      {thumbnail ? (
        <div
          className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style={{ backgroundImage: `url(${thumbnail})` }}
          title="Woman holding a mug"
        ></div>
      ) : (
        <div
          className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style={{ backgroundImage: `url('https://freepikpsd.com/wp-content/uploads/2019/10/image-not-found-png-4-Transparent-Images.png')` }}
          title="Woman holding a mug"
        ></div>
      )}


      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <p className="text-sm text-gray-600 flex items-center">
            <svg
              className="fill-current text-gray-500 w-3 h-3 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              {/* reddit icon */}
            </svg>
            {subreddit_name_prefixed}
          </p>
          <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div className="flex items-center">
          <div className="text-sm">
            <p className="text-gray-900 leading-none">{author}</p>
            <p className="text-gray-600">Date</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedLinkListItem;
