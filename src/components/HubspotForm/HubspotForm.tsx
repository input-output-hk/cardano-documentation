//@ts-nocheck
import React, { useEffect, useState, useCallback } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const LoadingSpinner = styled.div`
  border-width: 0.5rem;
  border-style: solid;
  border-color: #1f1f1f #1f1f1f #1f1f1f #ef131d;
  width: 3.625rem;
  height: 3.625rem;
  border-radius: 50%;
  position: relative;
  -webkit-animation: spin 2s infinite;
  animation: spin 2s infinite;
  &:before,
  &:after {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: transparent;
    position: absolute;
    left: 0.125rem;
  }
  &:before {
    top: 0.063rem;
  }
  &:after {
    bottom: 0.063rem;
  }
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`

const HubspotForm = (props) => {
  const { componentId, region, portalId, formId, onFormSubmitted } = props

  const [formReady, setFormReady] = useState(false)

  const onFormReady = useCallback(() => {
    setFormReady(true)
  }, [])

  const addScript = () => {
    let script
    if (typeof window !== 'undefined') {
      script = document.createElement('script')
      script.src = 'https://js.hsforms.net/forms/embed/v2.js'
      script.async = true

      script.onload = () => {
        if (window) {
          if (window.hbspt) {
            window.hbspt.forms.create({
              region: region,
              portalId: portalId,
              formId: formId,
              target: `#${componentId}`,
              onFormSubmitted: onFormSubmitted,
              onFormReady: onFormReady,
            })
          }
        }
      }
    }

    document.body.appendChild(script)
  }

  useEffect(() => {
    addScript()
  }, [])

  return (
    <>
      <div id={componentId} />
      {!formReady && (
        <Container>
          <LoadingSpinner />
        </Container>
      )}
    </>
  )
}

export default HubspotForm
