import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import isAbsoluteUrl from 'is-absolute-url'

const Link = ({ to, ...props }) =>
  isAbsoluteUrl(to) ? (
    <a href={to} {...props} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  ) : (
    <GatsbyLink to={to} {...props} />
  )

export default Link
