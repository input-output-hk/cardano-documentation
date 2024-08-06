import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { PostHog, PostHogProvider } from 'posthog-js/react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { posthog } from 'posthog-js'
import dayjs from 'dayjs'
import TrackRoute from './TrackRoute'
import useHasConsent, { ConsentType } from './useHasConsent'

export const AnalyticsContext = createContext<
  (eventName: string, eventProps?: Record<string, unknown>) => void
>(() => {})

export function AnalyticsProvider({ children }: PropsWithChildren) {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext()
  const [client, setClient] = useState<PostHog | undefined>()
  const analyticsAccepted = useHasConsent(ConsentType.ANALYTICS)

  const baseEventProps = useCallback(
    () => ({
      sent_at_local: dayjs().format(),
      posthog_project_id: customFields.posthogProjectId,
    }),
    [customFields.posthogProjectId],
  )

  const capture = useCallback(
    (
      eventName: string,
      eventProperties: Record<string | number, unknown> = {},
    ) => {
      client?.capture(eventName, {
        ...baseEventProps(),
        ...eventProperties,
      })
    },
    [client, baseEventProps],
  )

  useEffect(() => {
    const { posthogApiKey, posthogApiHost } = customFields
    const turnOn =
      analyticsAccepted === true &&
      typeof posthogApiKey === 'string' &&
      posthogApiKey &&
      typeof posthogApiHost === 'string' &&
      posthogApiHost

    setClient((oldClient) => {
      if (turnOn) {
        const client =
          oldClient ??
          (posthog.init(posthogApiKey ?? '', {
            api_host: posthogApiHost,
            capture_pageleave: false,
            capture_pageview: false,
          }) as PostHog)

        // clear localStorage state that might have been set by previous clients
        client.clear_opt_in_out_capturing()

        // we got consent, start capturing
        client.opt_in_capturing({
          capture_properties: baseEventProps(),
        })
        // calling a private function as a fix for bug https://github.com/PostHog/posthog-js/issues/336
        client._start_queue_if_opted_in()

        return client
      } else {
        oldClient?.opt_out_capturing()
        return undefined
      }
    })
  }, [
    customFields.posthogApiKey,
    customFields.posthogApiHost,
    analyticsAccepted,
    baseEventProps,
  ])

  return (
    <PostHogProvider client={client}>
      <AnalyticsContext.Provider value={capture}>
        <TrackRoute />
        {children}
      </AnalyticsContext.Provider>
    </PostHogProvider>
  )
}
