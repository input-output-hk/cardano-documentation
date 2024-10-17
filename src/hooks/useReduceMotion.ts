import { useEffect, useState } from 'react'

export function useReduceMotion() {
  const [reduceMotion, setReduceMotion] = useState<boolean>(false)

  useEffect(() => {
    const query = '(prefers-reduced-motion: reduce)'
    const matchMedia = window.matchMedia(query)
    setReduceMotion(matchMedia.matches)

    const listener = (e: MediaQueryListEvent) => {
      if (process.env.NODE_ENV !== 'production') {
        console.info(`Media query change: ${query} matches:`, e.matches)
      }
      setReduceMotion(e.matches)
    }

    matchMedia.addEventListener('change', listener)
    return () => matchMedia.removeEventListener('change', listener)
  }, [])

  return reduceMotion
}
