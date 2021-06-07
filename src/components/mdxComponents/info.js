import React from 'react'
import styled from '@emotion/styled'

import { Info } from '@styled-icons/icomoon/Info'
import { ErrorCircle } from '@styled-icons/boxicons-regular/ErrorCircle'
import { Error } from '@styled-icons/boxicons-regular/Error'

const StyledInfoBox = styled.div`
  width: 100%;
  margin: 3rem 0;
  padding: 1rem 2rem 1rem 0;
  display: block;
  position: relative;
  border-left: 4px solid;
  border-radius: 3px;
  border-color: ${({ theme }) => theme.colors.info};
  &.warn {
    border-color: ${({ theme }) => theme.colors.warn};
  }
  &.alert {
    border-color: ${({ theme }) => theme.colors.alert};
  }
  background: ${({ theme }) => theme.colors.panelBackground};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  > div {
    flex: 90%;
    display: flex;
    justify-content: space-around;
  }
  > div:first-of-type {
    flex: 10%;
    padding: 0 1rem;
  }
  svg {
    opacity: 0.5;
    width: 3rem;
    @media (max-width: 767px) {
      width: 1.75rem;
    }
  }

  &.info {
    svg {
      width: 2.5rem;
      @media (max-width: 767px) {
        width: 1.5rem;
      }
    }
  }

  &.alert {
    svg {
      opacity: 0.9;
    }
  }

  &.alert {
    svg {
      fill: ${({ theme }) => theme.colors.alert};
    }
  }

  p,
  h1,
  h2,
  h3,
  h4,
  span,
  a,
  button,
  span {
    margin: 0;
  }
`

const InfoBox = (props) => (
  <StyledInfoBox
    {...props}
    className={`${props.info && `info`} ${props.alert && `alert`} ${
      props.warn && `warn`
    }`}
  >
    {props.info && (
      <div>
        <Info />
      </div>
    )}
    {props.warn && (
      <div>
        <Error />
      </div>
    )}
    {props.alert && (
      <div>
        <ErrorCircle />
      </div>
    )}
    <div>
      <div>{props.children}</div>
    </div>
  </StyledInfoBox>
)

export default InfoBox
