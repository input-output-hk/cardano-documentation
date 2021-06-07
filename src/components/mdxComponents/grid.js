import * as React from 'react'
import styled from '@emotion/styled'

const StyledGrid = styled.section`
  ${props => props.yspace && `margin: ${props.yspace} 0;`}
  ${props =>
    props.bottomSpace &&
    `padding: 0 0 ${props.bottomSpace}rem 0;
    @media (max-width:767px) {
      padding: 0 0 ${parseInt(props.bottomSpace)}rem 0;
    }`}
  ${props => props.topSpace && `margin-top: ${props.topSpace}rem;`}
  display:flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 767px) {
    flex-direction: column;
    ${props => props.pullUp && `margin-bottom: ${props.pullUp}rem;`}
    ${props =>
      props.mobileBottomSpace &&
      `padding: 0 0 ${props.mobileBottomSpace}rem 0;`}
  }
`

const Grid = props => <StyledGrid {...props}>{props.children}</StyledGrid>

export default Grid
