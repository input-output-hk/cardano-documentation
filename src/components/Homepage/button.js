import * as React from 'react'
import styled from '@emotion/styled'

import { FaChevronRight } from 'react-icons/fa'

const StyledButton = styled.button`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  border: 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  background: none;
  color: rgba(0, 51, 173, 1);
  svg {
    transition: all 0.2s ease-in-out;
    max-width: 1rem;
    height: 1rem;
  }
  ${(props) =>
    props.btn === 'primary' &&
    `text-decoration: none;
    padding: 1rem 2.5rem;
    background-color: rgba(0,51,173,1);
    color: #fff;
    border-radius: 4rem;
    &:hover {
      opacity:0.75;
    }
  `}
  ${(props) =>
    props.btn === 'secondary' &&
    `text-decoration: none;
    padding: 1rem 2.5rem;
    background-color: #fff;
    color: rgba(0,51,173,1);
    border-radius: 4rem;
    &:hover {
      opacity:0.75;
    }
  `}

${(props) =>
    props.btn === 'hero' &&
    `text-decoration: none;
    padding: 1rem 2.5rem;
    background-color: rgba(0,51,173,1);
    color: #fff;
    border-radius: 4rem;
    min-width: 300px;
    &:hover {
      opacity:0.75;
    }
  `}
  &:hover {
    svg {
      transform: translateX(3px);
    }
  }
`

const Button = (props) => (
  <StyledButton {...props}>
    {props.children}
    {props.btn === 'primary' ||
    props.btn === 'secondary' ||
    props.btn === 'hero' ? (
      ''
    ) : (
      <FaChevronRight />
    )}
  </StyledButton>
)

export default Button
