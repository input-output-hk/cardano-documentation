import React, { useEffect } from 'react'
import { useMatomo } from '@datapunt/matomo-tracker-react'

export default function AnalyticsTrackPageView({ location, children }) {
  const { trackPageView } = useMatomo()

  // Track page view
  useEffect(() => {
    trackPageView()
  }, [location.href])

  return <>{children}</>
}
