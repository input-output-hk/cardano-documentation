import React, { createContext, useCallback, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { posthog } from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import TrackRoute from './TrackRoute'
import useHasConsent, { ConsentType } from './useHasConsent'

/**
 * @file This file exports an AnalyticsContext and an AnalyticsProvider component.
 * The AnalyticsContext is a context object that provides a function to capture analytics events.
 * The AnalyticsProvider is a component that provides the PostHog client and wraps its children with the AnalyticsContext.
 * @module AnalyticsContext
 */

/**
 * A context object that provides a function to capture analytics events.
 * @typedef {Object} AnalyticsContext
 * @property {Function} capture - A function that captures an analytics event.
 * @param {string} eventName - The name of the event to capture.
 * @param {Object} [eventProps] - An optional object containing additional properties to include in the event.
 */

/**
 * A component that provides the PostHog client and wraps its children with the AnalyticsContext.
 * @typedef {Object} AnalyticsProvider
 * @property {Object} children - The child components to wrap with the AnalyticsContext.
 */

/**
 * The base event properties to include in all analytics events.
 * @typedef {Function} BaseEventProps
 * @returns {Object} An object containing the base event properties.
 */

/**
 * A hook that returns the base event properties to include in all analytics events.
 * @typedef {Function} UseBaseEventProps
 * @returns {BaseEventProps} A function that returns an object containing the base event properties.
 */

/**
 * A hook that returns a function to capture analytics events.
 * @typedef {Function} UseAnalyticsCapture
 * @returns {Function} A function that captures an analytics event.
 * @param {string} eventName - The name of the event to capture.
 * @param {Object} [eventProps] - An optional object containing additional properties to include in the event.
 */

/**
 * A hook that returns the PostHog client.
 * @typedef {Function} UsePostHogClient
 * @returns {Object} The PostHog client.
 */

/**
 * A hook that returns whether the user has accepted analytics consent.
 * @typedef {Function} UseHasAnalyticsConsent
 * @returns {boolean} Whether the user has accepted analytics consent.
 */

/**
 * A hook that returns the PostHog client and a function to capture analytics events.
 * @typedef {Function} UseAnalytics
 * @returns {Array} An array containing the PostHog client and a function to capture analytics events.
 * @param {string} eventName - The name of the event to capture.
 * @param {Object} [eventProps] - An optional object containing additional properties to include in the event.
 */

/**
 * The props for the AnalyticsProvider component.
 * @typedef {Object} AnalyticsProviderProps
 * @property {Object} children - The child components to wrap with the AnalyticsContext.
 */

/**
 * The props for the AnalyticsContextProvider component.
 * @typedef {Object} AnalyticsContextProviderProps
 * @property {Function} capture - A function that captures an analytics event.
 * @param {string} eventName - The name of the event to capture.
 * @param {Object} [eventProps] - An optional object containing additional properties to include in the event.
 * @property {Object} children - The child components to wrap with the AnalyticsContext.
 */
export const AnalyticsContext = createContext(() => {})

export function AnalyticsProvider({ children }) {
  const [client, setClient] = useState()

  const analyticsAccepted = useHasConsent(ConsentType.ANALYTICS)

  console.log('are they accepted? ' + analyticsAccepted)
  console.log('project id ' + process.env.GATSBY_POSTHOG_PROJECT_ID)

  console.log('project api key ' + process.env.GATSBY_POSTHOG_API_KEY)

  console.log('api host' + process.env.GATSBY_POSTHOG_API_HOST)

  console.log('what about this ' + process.env.GATSBY_OSANO)

  const baseEventProps = useCallback(
    () => ({
      sent_at_local: dayjs().format(),
      posthog_project_id: process.env.GATSBY_POSTHOG_PROJECT_ID,
    }),
    [],
  )

  const capture = useCallback(
    (eventName, eventProperties = {}) => {
      if (client) {
        client.capture(eventName, {
          ...baseEventProps(),
          ...eventProperties,
        })
      }
    },
    [client, baseEventProps],
  )

  useEffect(() => {
    const posthogApiKey = process.env.GATSBY_POSTHOG_API_KEY

    const posthogApiHost = process.env.GATSBY_POSTHOG_API_HOST

    const turnOn =
      analyticsAccepted === true &&
      typeof posthogApiKey === 'string' &&
      posthogApiKey &&
      typeof posthogApiHost === 'string' &&
      posthogApiHost

    setClient(oldClient => {
      if (turnOn) {
        const client =
          oldClient ??
          posthog.init(posthogApiKey ?? '', {
            api_host: posthogApiHost,
            capture_pageleave: false,
            capture_pageview: false,
          })

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
        if (oldClient) {
          oldClient.opt_out_capturing()
        }
        return undefined
      }
    })
  }, [analyticsAccepted, baseEventProps])

  return (
    <PostHogProvider client={client}>
      <AnalyticsContext.Provider value={capture}>
        <TrackRoute />
        {children}
      </AnalyticsContext.Provider>
    </PostHogProvider>
  )
}
