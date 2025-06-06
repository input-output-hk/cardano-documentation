import * as React from 'react'
import styled from '@emotion/styled'

const SubHeading = styled.span`
  ${(props) => props.color && `color: ${props.color};`}
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  justify-self: center;
  margin: var(--ifm-heading-margin-top) 0 var(--ifm-heading-margin-bottom) 0;
`

const SectionSubHeading = (props) => (
  <SubHeading {...props}>{props.children}</SubHeading>
)

export default SectionSubHeading
