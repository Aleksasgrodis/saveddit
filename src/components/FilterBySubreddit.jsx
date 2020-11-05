import React from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createSelector } from 'reselect';
import { loadNumberedPage, setSearchResults, setSubredditFilter, setSubredditSearchResults } from '../redux/actions';
import PaginationNavigation from './PaginationNavigation';
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
  const dispatch = useDispatch();
  const [sortedPosts, setSortedPosts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const filteredPosts = useSelector(subredditLinksSelector(subreddit));
  const filteredPostsCopy = useMemo(() => {
    return filteredPosts;
  }, [filteredPosts]);

  const { pageResults, currentPage, searchPages, searchResults } = useSelector(state => state.saved);
  console.log(searchResults);
  useEffect(() => {
    dispatch(setSubredditFilter({ subreddit: subreddit }));
    return () => {
      dispatch(setSubredditFilter({ subreddit: null }));
    };
  }, [dispatch, subreddit]);

  useEffect(() => {
    dispatch(setSearchResults({value: searchValue}))
  }, [searchValue, dispatch])

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

  // This hook seems to cause many re-renders, haven't figured out exactly why yet.
  // useEffect(() => {
  //   console.log('searchval: ', searchValue, ' posts: ', filteredPostsCopy);
  //   if (filteredPostsCopy && searchValue !== '') {
  //     setSortedPosts(
  //       filteredPostsCopy.filter(post =>
  //         post.title.toLowerCase().includes(searchValue.toLowerCase()),
  //       ),
  //     );
  //   }
  // }, [searchValue, filteredPostsCopy]);

  // useEffect(() => {
  //   console.log('render:');
  // if (filteredPostsCopy) setPosts(filteredPostsCopy);
  //   return () => {};
  // }, [filteredPostsCopy, posts]);

  // useEffect(() => {
  //   console.log('posts change: ', posts);
  //   return () => {};
  // }, [posts]);

  // useEffect(() => {
  //   console.log('copy change: ', filteredPostsCopy);
  //   return () => {};
  // }, [filteredPostsCopy]);

  const search = { sortBy, withSort: true, searchValue, setSearchValue };

  return (
    <div>
      <div className="fixed">
        <Search {...search} />
      </div>
      <div className="flex flex-wrap justify-center">
        {pageResults.map(link => (
          <SavedLinkListItem key={link.permalink} {...link} />
        ))}
      </div>
      <PaginationNavigation total={searchPages}
        action={loadNumberedPage}
        currentPage={currentPage} />
    </div>
  );
}

export default FilterBySubreddit;
