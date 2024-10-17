import styled from '@emotion/styled'
import * as React from 'react'

export const Svg = styled.svg`
  display: inline-block;
  vertical-align: middle;
`
type SvgProps = React.ComponentPropsWithoutRef<typeof Svg>

function FloatingRadial({
  width = 14,
  height = 14,
  color = '#FF7676',
  ...props
}: SvgProps & {
  width?: number
  height?: number
  color?: string
}) {
  //   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  // <circle cx="12" cy="12" r="12" fill="#FF7676"/>
  // </svg>
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={width / 2} cy={height / 2} r={width / 2} fill={color} />
    </svg>
  )
}

export default FloatingRadial
