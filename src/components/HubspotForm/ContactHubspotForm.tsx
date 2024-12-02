import React, { useCallback, useState } from 'react'
import HubspotForm from './HubspotForm'

const ContactHubspotForm = ({ formId, portalId, region }) => {
  const [submitted, setSubmitted] = useState(false)

  const onFormSubmitted = useCallback(() => {
    setSubmitted(true)
  }, [])

  return submitted ? (
    <div className="hs-form-submitted-message">
      <h3 className="hs-form-submitted-title">Enquiry submitted</h3>
      <p>We'll be in touch soon!</p>
    </div>
  ) : (
    <HubspotForm
      componentId="newsletterHSForm"
      region={region}
      portalId={portalId}
      formId={formId}
      onFormSubmitted={onFormSubmitted}
    />
  )
}

export default ContactHubspotForm
