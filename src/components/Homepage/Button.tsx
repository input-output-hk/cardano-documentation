import * as React from 'react'
import styled from '@emotion/styled'

const StyledButton = styled.button`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  border: 0;
  cursor: pointer;
  text-decoration: none;
  background: none;
  color: #fff;
  gap: 0.625rem;
`

const Button = (props) => (
  <StyledButton {...props}>{props.children}</StyledButton>
)

export default Button
