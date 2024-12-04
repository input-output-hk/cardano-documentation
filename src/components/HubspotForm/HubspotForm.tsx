//@ts-nocheck
import React, { useEffect, useState, useCallback } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

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
        <div className="hs-loading-container">
          <div className="hs-loading-spinner" />
        </div>
      )}
    </>
  )
}

export default HubspotForm
