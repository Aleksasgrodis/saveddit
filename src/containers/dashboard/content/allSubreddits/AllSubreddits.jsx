import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import AnchorNavigation from './components/AnchorNavigation'
import SubredditListItem from './components/SubredditListItem'
import { ComponentContext } from '../../../../context/componentContext'

const linksSelector = (state) => state.saved.links
const subredditSelector = createSelector(linksSelector, (links) =>
  links.map((link) => link.subreddit),
)

function AllSubreddits() {
  const [searchResults, setSearchResults] = useState(null)
  // const search = { subredditSearchValue, setSubredditSearchValue }
  const duplicateSubreddits = useSelector(subredditSelector)
  const subreddits = [...new Set(duplicateSubreddits)].sort((a, b) =>
    a.localeCompare(b),
  )
  const copy = useMemo(() => [...duplicateSubreddits], [duplicateSubreddits])
  const {
    setHeadingTitle,
    setHeadingSort,
    subredditSearchValue,
    setCustomSearch,
  } = useContext(ComponentContext)

  useEffect(() => {
    setHeadingTitle('All Subreddits')
    setHeadingSort(false)
    setCustomSearch(true)
    return () => {
      setHeadingTitle(null)
      setHeadingSort(true)
      setCustomSearch(false)
    }
  }, [])

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
    '0-9',
  ]
  const sortedByLetter = alphabet.map((letter) => {
    if (letter === '0-9') {
      return [letter, [...subreddits.filter((sub) => /\d/.test(sub.charAt(0)))]]
    }
    return [
      letter,
      [...subreddits.filter((sub) => sub.toUpperCase().charAt(0) === letter)],
    ]
  })
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
      '0-9',
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
              .filter((link) => {
                if (letter === '0-9') {
                  return /\d/.test(link.charAt(0))
                }
                return link.toUpperCase().charAt(0) === letter
              }),
          ],
        ]),
      )
    }
  }, [subredditSearchValue, copy])

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '')
      const element = document.getElementById(id)
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <div className="flex flex-col ">
      <div className="flex p-5">
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
                return null
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
                return null
              })}
        </div>
        <AnchorNavigation sortedArray={sortedByLetter} />
      </div>
    </div>
  )
}

export default AllSubreddits
