import { create } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavHashLink } from 'react-router-hash-link';
import { createSelector } from 'reselect';
import Search from './Search';
import SubredditListItem from './SubredditListItem';

const linksSelector = state => state.saved.links;
const subredditSelector = createSelector(linksSelector, links =>
  links.map(link => link.subreddit),
);

function AllSubreddits() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const search = { searchValue, setSearchValue };
  const duplicateSubreddits = useSelector(subredditSelector);
  const subreddits = [...new Set(duplicateSubreddits)].sort((a, b) =>
    a.localeCompare(b),
  );
  const copy = useMemo(() => [...duplicateSubreddits], [duplicateSubreddits]);

  const alphabet = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  const sortedByLetter = alphabet.map(letter => [
    letter,
    [...subreddits.filter(link => link.toUpperCase().charAt(0) === letter)],
  ]);
  useEffect(() => {
    const alphabetEffect = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];
    if (copy) {
      const sortedSubreddits = [...new Set(copy)].sort((a, b) =>
        a.localeCompare(b),
      );
      setSearchResults(
        alphabetEffect.map(letter => [
          letter,
          [
            ...sortedSubreddits
              .filter(sub =>
                sub.toLowerCase().includes(searchValue.toLowerCase()),
              )
              .filter(link => link.toUpperCase().charAt(0) === letter),
          ],
        ]),
      );
    }
  }, [searchValue, copy]);
  return (
    <div className="flex flex-col">
      <div className="fixed">
        <Search {...search} />
      </div>
      {/* {subreddits
          ? subreddits.map(sub => <SubredditListItem key={sub} title={sub} />)
          : null} */}
      <div className="flex">
        <div className="mt-16">
          {sortedByLetter && !searchValue.length
            ? sortedByLetter.map(letter => {
                if (letter[1].length) {
                  return (
                    <section
                      id={`section-${letter[0].toLowerCase()}`}
                      className="w-11/12 flex flex-col flex-wrap"
                      key={letter[0]}
                    >
                      <h2 className="font-bold text-4xl">{letter[0]}</h2>
                      <div className="flex flex-wrap">
                        {letter[1].map(sub => (
                          <SubredditListItem key={sub} title={sub} />
                        ))}
                      </div>
                    </section>
                  );
                } else return null;
              })
            : searchResults.map(letter => {
              if (letter[1].length) {
                return (
                  <section
                    id={`section-${letter[0].toLowerCase()}`}
                    className="w-11/12 flex flex-col flex-wrap"
                    key={letter[0]}
                  >
                    <h2 className="font-bold text-4xl">{letter[0]}</h2>
                    <div className="flex flex-wrap">
                      {letter[1].map(sub => (
                        <SubredditListItem key={sub} title={sub} />
                      ))}
                    </div>
                  </section>
                );
              } else return null;
            })}
        </div>
        <div className="fixed right-0 inset-y-0 mr-16">
          <div className="flex flex-col h-full justify-center items-center">
            {sortedByLetter.map(letter => {
              return letter[1].length ? (
                <NavHashLink
                  key={letter[0]}
                  className="font-bold text-gray-400 hover:text-gray-900"
                  to={`/dashboard/subreddits#section-${letter[0].toLowerCase()}`}
                  smooth
                  activeClassName="text-orange-600 text-xl font-bolder"
                >
                  {letter[0]}
                </NavHashLink>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllSubreddits;
