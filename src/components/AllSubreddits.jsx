import { create } from 'lodash';
import React from 'react';
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
  const duplicateSubreddits = useSelector(subredditSelector);
  const subreddits = [...new Set(duplicateSubreddits)].sort((a, b) =>
    a.localeCompare(b),
  );
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
  console.log(sortedByLetter);
  return (
    <div className="flex flex-col">
      <div className="fixed">
        <Search />
      </div>
      {/* {subreddits
          ? subreddits.map(sub => <SubredditListItem key={sub} title={sub} />)
          : null} */}
      <div className="flex">
        <div className="mt-16">
          {sortedByLetter
            ? sortedByLetter.map(letter => {
                if (letter[1].length) {
                  return (
                    <section
                      id={`section-${letter[0].toLowerCase()}`}
                      className="w-full flex flex-col flex-wrap"
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
            : null}
        </div>
        <div className="fixed right-0 inset-y-0 mr-6">
          <div className="flex flex-col justify-around h-full">
            {sortedByLetter.map(letter => {
              return letter[1].length ? (
                <NavHashLink
                className="font-bold"
                  to={`/dashboard/subreddits#section-${letter[0].toLowerCase()}`}
                  smooth
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
