import React from 'react'
import styled from '@emotion/styled'

const StyledBreakout = styled('div')`
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100vw;
  ${props =>
    props.bgHiLight && `background-color: ${props.theme.colors.primaryAccent};`}
`

const Breakout = ({ children, className, bgHiLight, theme }) => (
  <StyledBreakout className={className} bgHiLight={bgHiLight} theme={theme}>
    {children}
  </StyledBreakout>
)

export default Breakout
