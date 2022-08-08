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

  // TODO: Some child entries are intented to simply link out to an external source.
  // This is a quick and dirty way of making this happen which needs to be tidied up.

  if (title === 'Testnet Explorer')
    url = 'https://explorer.cardano-testnet.iohkdev.io/en'
  if (title === 'Grafana Dashboard')
    url =
      'https://monitoring.cardano-testnet.iohkdev.io/grafana/d/Oe0reiHef/cardano-application-metrics-v2?orgId=1&refresh=1m&from=now-2d&to=now'

  const isExternal = url && url.includes('http')

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
            <Link to={url}>
              {title}
              {isExternal && <ExternalLink size={14} />}

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
