import React from 'react'
import styled from '@emotion/styled'

const StyledBackdrop = styled('div')`
  ${(props) => props.color && `background-color: ${props.color};`}
`

const Backdrop = ({ children, color }) => (
  <StyledBackdrop color={color}>{children}</StyledBackdrop>
)

export default Backdrop
