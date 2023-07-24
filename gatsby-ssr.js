import React from 'react'

const OSANO_SRC = process.env.GATSBY_OSANO

export function onRenderBody({ setHeadComponents }) {
  const scripts = []

  if (OSANO_SRC) {
    scripts.unshift(<script key="osano" src={OSANO_SRC} />)
  }

  setHeadComponents(scripts)
}
