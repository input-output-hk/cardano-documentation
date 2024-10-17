import * as React from 'react'
import styled from '@emotion/styled'

const SubHeading = styled.h4`
  ${(props) => props.color && `color: ${props.color};`}
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  justify-self: center;
`

const SectionSubHeading = (props) => (
  <SubHeading {...props}>{props.children}</SubHeading>
)

export default SectionSubHeading
