import * as React from 'react'

const checkExternalLinks = (link) => {
  if (/^(https?:)?\/\//.test(link.href)) {
    return `_blank`
  } else {
    return `_self`
  }
}

const AnchorTag = ({ children: link, ...props }) => {
  if (link) {
    return (
      <a
        href={props.href}
        target={checkExternalLinks(props)}
        rel="noopener noreferrer"
      >
        {link}
      </a>
    )
  } else {
    return null
  }
}

export default AnchorTag
