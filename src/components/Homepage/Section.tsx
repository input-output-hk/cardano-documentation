import React from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  max-width: 1248px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 32px;
  padding-right: 32px;
`

export const PaddingWrapper = styled('div')`
  padding: 6rem 0;
  display: grid;

  @media (max-width: 1024px) {
    padding: 4rem 0;
  }

  @media (max-width: 768px) {
    padding: 3.5rem 0;
  }
`

const Section = ({ children }) => <Container>{children}</Container>

export default Section
