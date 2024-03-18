import React from 'react'
import styled from '@emotion/styled'

const StyledSiteWidthWrap = styled('div')`
  max-width: 71.25rem;
  margin: 0 auto;
  @media (max-width: 1220px) {
    max-width: 87vw;
  }
`

const SiteWidthWrap = ({ children, className }) => (
  <StyledSiteWidthWrap className={className}>{children}</StyledSiteWidthWrap>
)

export default SiteWidthWrap
