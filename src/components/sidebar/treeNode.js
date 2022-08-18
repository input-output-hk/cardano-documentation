import React from 'react'
import { ExternalLink } from 'react-feather'

import OpenedSvg from '../images/opened'
import ClosedSvg from '../images/closed'
import config from '../../../config'
import Link from '../link'
import stripNumbers from '../../utils/stripNumbersFromPath'

const TreeNode = ({
  className = '',
  setCollapsed,
  collapsed,
  url,
  title,
  externalUrl,
  items,
  ...rest
}) => {
  url = stripNumbers(url)
  const isCollapsed = collapsed[url]

  const collapse = () => {
    setCollapsed(url)
  }

  const hasChildren = items.length !== 0

  let location

  if (typeof document != 'undefined') {
    location = document.location
  }
  const active =
    location &&
    (location.pathname === url ||
      location.pathname === config.gatsby.pathPrefix + url)

  const calculatedClassName = `${className} item ${active ? 'active' : ''}`

  return (
    <li className={calculatedClassName}>
      {hasChildren
        ? title && (
            <a className="sectionHeading" onClick={collapse}>
              {title}
              {config.sidebar.frontLine && title && hasChildren ? (
                <button
                  onClick={collapse}
                  aria-label="collapse"
                  className="collapser"
                >
                  {!isCollapsed ? <OpenedSvg /> : <ClosedSvg />}
                </button>
              ) : null}
            </a>
          )
        : title && (
            <Link to={externalUrl || url}>
              {title}
              {externalUrl && <ExternalLink size={14} />}

              {!config.sidebar.frontLine && title && hasChildren ? (
                <button
                  onClick={collapse}
                  aria-label="collapse"
                  className="collapser"
                >
                  {!isCollapsed ? <OpenedSvg /> : <ClosedSvg />}
                </button>
              ) : null}
            </Link>
          )}

      {!isCollapsed && hasChildren ? (
        <ul>
          {items.map((item, index) => (
            <TreeNode
              key={item.url + index.toString()}
              setCollapsed={setCollapsed}
              collapsed={collapsed}
              {...item}
            />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

export default TreeNode
