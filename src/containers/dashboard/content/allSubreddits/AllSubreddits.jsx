import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import AnchorNavigation from './components/AnchorNavigation'
import ContentHeader from '../../../../components/ContentHeader'
import SubredditListItem from './components/SubredditListItem'

const linksSelector = (state) => state.saved.links
const subredditSelector = createSelector(linksSelector, (links) =>
  links.map((link) => link.subreddit),
)

function AllSubreddits() {
  const [subredditSearchValue, setSubredditSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const search = { subredditSearchValue, setSubredditSearchValue }
  const duplicateSubreddits = useSelector(subredditSelector)
  const subreddits = [...new Set(duplicateSubreddits)].sort((a, b) =>
    a.localeCompare(b),
  )
  const copy = useMemo(() => [...duplicateSubreddits], [duplicateSubreddits])

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
  ]
  const sortedByLetter = alphabet.map((letter) => [
    letter,
    [...subreddits.filter((link) => link.toUpperCase().charAt(0) === letter)],
  ])
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
    ]
    if (copy) {
      const sortedSubreddits = [...new Set(copy)].sort((a, b) =>
        a.localeCompare(b),
      )
      setSearchResults(
        alphabetEffect.map((letter) => [
          letter,
          [
            ...sortedSubreddits
              .filter((sub) =>
                sub.toLowerCase().includes(subredditSearchValue.toLowerCase()),
              )
              .filter((link) => link.toUpperCase().charAt(0) === letter),
          ],
        ]),
      )
    }
  }, [subredditSearchValue, copy])

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '')
      const element = document.getElementById(id)
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [])

  return (
    <div className="flex flex-col">
      <ContentHeader {...search} title="All Subreddits" />
      <div className="flex pt-32">
        <div className="">
          {sortedByLetter && !subredditSearchValue.length
            ? sortedByLetter.map((letter) => {
                if (letter[1].length) {
                  return (
                    <section
                      id={`section-${letter[0].toLowerCase()}`}
                      className="w-11/12 flex flex-col flex-wrap"
                      key={letter[0]}
                    >
                      <h2 className="font-bold text-4xl">{letter[0]}</h2>
                      <div className="flex flex-wrap">
                        {letter[1].map((sub) => (
                          <SubredditListItem key={sub} title={sub} />
                        ))}
                      </div>
                    </section>
                  )
                }
              })
            : searchResults.map((letter) => {
                if (letter[1].length) {
                  return (
                    <section
                      id={`section-${letter[0].toLowerCase()}`}
                      className="w-11/12 flex flex-col flex-wrap"
                      key={letter[0]}
                    >
                      <h2 className="font-bold text-4xl">{letter[0]}</h2>
                      <div className="flex flex-wrap">
                        {letter[1].map((sub) => (
                          <SubredditListItem key={sub} title={sub} />
                        ))}
                      </div>
                    </section>
                  )
                }
              })}
        </div>
        <AnchorNavigation sortedArray={sortedByLetter} />
      </div>
    </div>
  )
}

export default AllSubreddits
