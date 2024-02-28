import React from 'react'
import styled from '@emotion/styled'

const StyledBreakout = styled('div')`
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100vw;
  background-color: rgba(0, 51, 173, 0.05);
`

const Breakout = ({ children, className, bgHiLight }) => (
  <StyledBreakout className={className} bgHiLight={bgHiLight}>
    {children}
  </StyledBreakout>
)

export default Breakout
