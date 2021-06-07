import * as React from 'react'
import styled from '@emotion/styled'

const StyledGridItem = styled.div`
  ${props => props.yspace && `margin: ${props.yspace}rem 0;`}
  ${props =>
    props.yspace &&
    `@media (max-width:959px) {margin: ${props.yspace / 2}rem 0;}`}
  ${props => props.flexFactor && `width: ${props.flexFactor}`};
  ${props =>
    props.mobFlexFactor &&
    `@media (max-width: 1159px) { width: ${props.mobFlexFactor}}`};
  @media (max-width: 767px) {
    width: 100%;
    margin-bottom: 2rem;
  }
  ${props =>
    props.single &&
    `border: none; * {
    text-align: center;
    margin: 0 auto 2rem auto;
  }`}
`

const GridItem = props => (
  <StyledGridItem {...props}>{props.children}</StyledGridItem>
)

export default GridItem
