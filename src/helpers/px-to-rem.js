const defaultPxToRemOptions = {
  rootFontSize: 16,
  separator: ' '
}

export function pxToRem(
  maybeOptions,
  ...px
) {
  const opts =
    typeof maybeOptions === 'object' ? maybeOptions : defaultPxToRemOptions

  const rootFontSize = opts.rootFontSize ?? defaultPxToRemOptions.rootFontSize

  const separator = opts.separator ?? defaultPxToRemOptions.separator

  if (typeof maybeOptions === 'number') {
    px.unshift(maybeOptions)
  }

  return px.map((val) => `${val / rootFontSize}rem`).join(separator)
}
