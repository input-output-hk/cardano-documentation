import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import ArrowRight from '@site/src/components/icons/ArrowRight.svg'

export default function PaginatorNavLink(props) {
  const { permalink, title, subLabel, isNext } = props
  return (
    <Link
      className={clsx(
        'pagination-nav__link',
        isNext ? 'pagination-nav__link--next' : 'pagination-nav__link--prev',
      )}
      to={permalink}
    >
      {!isNext && <ArrowRight className="rotated-arrow " />}
      <div className="pagination-labels-wrapper">
        {subLabel && <div className="pagination-nav__sublabel">{subLabel}</div>}
        <div className="pagination-nav__label">{title}</div>
      </div>
      {isNext && <ArrowRight />}
    </Link>
  )
}
