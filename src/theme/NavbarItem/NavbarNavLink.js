import React from 'react'
import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'
import isInternalUrl from '@docusaurus/isInternalUrl'
import { isRegexpStringMatch } from '@docusaurus/theme-common'
import ChevronDown from '@site/src/components/icons/ChevronDown.svg'
import ArrowRight from '@site/src/components/icons/ArrowRight.svg'
import styled from '@emotion/styled'

const ArrowExternal = styled(ArrowRight)`
  transform: rotate(-45deg);
`

export default function NavbarNavLink({
  activeBasePath,
  activeBaseRegex,
  to,
  href,
  label,
  html,
  isDropdownLink,
  prependBaseUrlToHref,
  ...props
}) {
  // TODO all this seems hacky
  // {to: 'version'} should probably be forbidden, in favor of {to: '/version'}
  const toUrl = useBaseUrl(to)
  const activeBaseUrl = useBaseUrl(activeBasePath)
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true })
  const isExternalLink = label && href && !isInternalUrl(href)
  const isDropdown = href === '#'
  // Link content is set through html XOR label
  const linkContentProps = html
    ? { dangerouslySetInnerHTML: { __html: html } }
    : {
        children: (
          <>
            {label}
            {isExternalLink && <ArrowExternal />}
            {isDropdown && <ChevronDown />}
          </>
        ),
      }
  if (href) {
    return (
      <Link
        href={prependBaseUrlToHref ? normalizedHref : href}
        {...props}
        {...linkContentProps}
      />
    )
  }
  return (
    <Link
      to={toUrl}
      isNavLink
      {...((activeBasePath || activeBaseRegex) && {
        isActive: (_match, location) =>
          activeBaseRegex
            ? isRegexpStringMatch(activeBaseRegex, location.pathname)
            : location.pathname.startsWith(activeBaseUrl),
      })}
      {...props}
      {...linkContentProps}
    />
  )
}
