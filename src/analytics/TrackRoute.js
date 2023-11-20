import { useLocation } from '@reach/router'
import { useContext, useEffect } from 'react'
import { AnalyticsContext } from './AnalyticsContext'

export default function TrackRoute() {
  const location = useLocation()

  const capture = useContext(AnalyticsContext)

  useEffect(() => {
    capture('$pageview')
  }, [capture, location.pathname, location.search])

  return null
}
