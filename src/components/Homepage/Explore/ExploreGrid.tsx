import * as React from 'react'
import styled from '@emotion/styled'

const StyledGrid = styled.section`
  padding-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  column-gap: 1.5rem;
  row-gap: 3rem;
  justify-content: center;

  a {
    text-decoration: none;
  }

  > :nth-child(1),
  > :nth-child(2),
  > :nth-child(3) {
    flex: 1 1 calc(33.33% - 2rem);
  }

  > :nth-child(4),
  > :nth-child(5) {
    flex: 1 1 calc(50% - 2rem);
    display: flex;
    justify-content: flex-end;
  }

  > :nth-child(5) {
    justify-content: flex-start;
  }

  @media (max-width: 1024px) {
    row-gap: 1.5rem;
    > :nth-child(1),
    > :nth-child(2) {
      flex: 1 1 calc(50% - 2rem);
      display: flex;
      justify-content: flex-end;
    }

    > :nth-child(2) {
      justify-content: flex-start;
    }

    > :nth-child(3),
    > :nth-child(4) {
      flex: 1 1 calc(50% - 2rem);
      display: flex;
      justify-content: flex-end;
    }

    > :nth-child(4) {
      justify-content: flex-start;
    }

    > :nth-child(5) {
      justify-content: center;
      flex: 1 1 100%;
    }
  }
`

const ExploreGrid = (props) => <StyledGrid>{props.children}</StyledGrid>

export default ExploreGrid
