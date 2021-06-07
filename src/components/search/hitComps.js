import React from 'react'
import { Highlight, Snippet } from 'react-instantsearch-dom'
import { Link } from 'gatsby'
import stripNumbers from '../../utils/stripNumbersFromPath'

export const PageHit =
  (clickHandler) =>
  ({ hit }) => {
    hit.slug = stripNumbers(hit.slug)

    return (
      <div>
        <Link to={hit.slug} onClick={clickHandler}>
          <div>
            <Highlight attribute="title" hit={hit} tagName="mark" />
          </div>
        </Link>
        <Snippet attribute="excerpt" hit={hit} tagName="mark" />
      </div>
    )
  }
