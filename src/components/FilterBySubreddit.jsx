import React from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createSelector } from 'reselect';
import SavedLinkListItem from './SavedLinkListItem';
import Search from './Search';

const linksSelector = state => state.saved.links;
const subredditLinksSelector = subreddit =>
  createSelector(linksSelector, links =>
    links.filter(
      link => link.subreddit.toLowerCase() === subreddit.toLowerCase(),
    ),
  );

function FilterBySubreddit() {
  const { subreddit } = useParams();
  const [sortedPosts, setSortedPosts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const filteredPosts = useSelector(subredditLinksSelector(subreddit));
  const filteredPostsCopy = useMemo(() => [...filteredPosts], [filteredPosts]);

  const sortBy = value => {
    switch (value) {
      case 'a-z':
        setSortedPosts(
          filteredPostsCopy.sort((a, b) => a.title.localeCompare(b.title)),
        );
        break;
      case 'z-a':
        setSortedPosts(
          filteredPostsCopy.sort((a, b) => b.title.localeCompare(a.title)),
        );
        break;
      case 'dateNew':
        setSortedPosts(
          filteredPostsCopy.sort((a, b) =>
            a.created_utc > b.created_utc ? -1 : 1,
          ),
        );
        break;
      case 'dateOld':
        setSortedPosts(
          filteredPostsCopy.sort((a, b) =>
            a.created_utc > b.created_utc ? 1 : -1,
          ),
        );
        break;
      case 'popularity':
        setSortedPosts(
          filteredPostsCopy.sort((a, b) => (a.score > b.score ? -1 : 1)),
        );
        break;
      case 'lastSaved':
        setSortedPosts([]);
        break;
      default:
        break;
    }
  };

  // useEffect(() => {
  //   if (filteredPostsCopy) {
  //     setSortedPosts(
  //       filteredPostsCopy.filter(post =>
  //         post.title.toLowerCase().includes(searchValue.toLowerCase()),
  //       ),
  //     );
  //   }
  // }, [searchValue, filteredPostsCopy]);

  const search = { sortBy, withSort: true, searchValue, setSearchValue };

  return (
    <div>
      <div className="fixed">
        <Search {...search} />
      </div>
      <div className="flex flex-wrap justify-center">
        {filteredPostsCopy && !sortedPosts.length
          ? filteredPostsCopy.map(link => (
              <SavedLinkListItem key={link.permalink} {...link} />
            ))
          : sortedPosts.map(link => (
              <SavedLinkListItem key={link.permalink} {...link} />
            ))}
      </div>
    </div>
  );
}

export default FilterBySubreddit;
