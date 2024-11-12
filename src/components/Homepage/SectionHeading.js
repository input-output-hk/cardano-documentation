import * as React from 'react'
import styled from '@emotion/styled'

const Heading = styled.h2`
  ${(props) => props.color && `color: ${props.color};`}
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.215rem;
  justify-self: center;
  text-align: center;
`

const SectionHeading = (props) => <Heading {...props}>{props.children}</Heading>

export default SectionHeading
