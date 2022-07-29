import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import testnetsTheme from '../../utils/testnetsTheme'

const Container = styled.div`
  width: 100%;

  svg {
    fill: ${testnetsTheme.palette.primary.main};
  }

  &.active {
    svg {
      fill: ${testnetsTheme.palette.background.default};
    }
  }
`

const OperatorIcon = ({ active }) => (
  <Container className={active ? 'active' : ''}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 25">
      <path
        fillRule="nonzero"
        d="M24.595 0l.134.006A1.41 1.41 0 0 1 26 1.406V20.73l-.006.135a1.41 1.41 0 0 1-1.4 1.27h-1.053v.703l-.007.135a1.41 1.41 0 0 1-1.399 1.27h-2.108l-.135-.006a1.41 1.41 0 0 1-1.27-1.4v-.702H7.378v.703l-.006.135a1.41 1.41 0 0 1-1.399 1.27H3.865l-.135-.006a1.41 1.41 0 0 1-1.27-1.4v-.702H1.404l-.134-.006A1.41 1.41 0 0 1 0 20.729V1.406l.006-.134A1.41 1.41 0 0 1 1.406 0h23.189zm-2.109 22.135h-2.81v.703l.007.07a.357.357 0 0 0 .344.281h2.108l.07-.007a.357.357 0 0 0 .281-.344v-.703zm-16.162 0h-2.81v.703l.007.07a.357.357 0 0 0 .344.281h2.108l.07-.007a.357.357 0 0 0 .281-.344v-.703zm18.27-21.08H1.406c-.19 0-.35.16-.35.35V20.73l.006.07a.357.357 0 0 0 .344.281h23.19l.07-.007a.357.357 0 0 0 .28-.344V1.405l-.006-.07a.357.357 0 0 0-.344-.28zm-1.592 1.24l.095.007a.705.705 0 0 1 .608.696v16.139l-.007.095a.705.705 0 0 1-.696.608H3.865l-.095-.007a.705.705 0 0 1-.608-.696v-3.502h-.705l-.095-.008a.527.527 0 0 1 .095-1.046h.705V7.905h-.705l-.095-.008a.527.527 0 0 1 .095-1.046h.705V2.998l.007-.095a.705.705 0 0 1 .696-.608h19.137zM22.65 3.35H4.216v15.436H22.65V3.35zm-5.332 4.923a2.955 2.955 0 1 1 0 5.909 2.955 2.955 0 0 1 0-5.91zm0 1.182a1.773 1.773 0 1 0 0 3.545 1.773 1.773 0 0 0 0-3.545z"
      />
    </svg>
  </Container>
)

OperatorIcon.propTypes = {
  active: PropTypes.bool.isRequired,
}

export default OperatorIcon
