import { useEffect, useState } from 'react'
import { OsanoConsentDecision, OsanoConsentType, OsanoEvent } from './osano'

export { OsanoConsentType as ConsentType }

export default function useHasConsent(type) {
  let initialConsent

  try {
    initialConsent =
      typeof window && typeof window.Osano !== 'undefined'
        ? window.Osano.cm.getConsent()[type] === OsanoConsentDecision.ACCEPT
        : undefined
  } catch (err) {
    console.log(err)
  }

  const [state, setState] = useState(initialConsent)

  useEffect(() => {
    const cm =
      typeof window && typeof window.Osano !== 'undefined'
        ? window.Osano.cm
        : undefined

    if (!cm) {
      return
    }

    setState(cm.getConsent()[type] === OsanoConsentDecision.ACCEPT)

    const handler = changed => {
      if (type in changed) {
        setState(changed[type] === OsanoConsentDecision.ACCEPT)
      }
    }

    cm.addEventListener(OsanoEvent.CONSENT_SAVED, handler)
    return () => {
      cm.removeEventListener(OsanoEvent.CONSENT_SAVED, handler)
    }
  }, [type])

  return state
}
