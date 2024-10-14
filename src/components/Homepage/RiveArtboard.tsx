import {
  useRive,
  Layout,
  Fit,
  Alignment,
  useStateMachineInput,
} from '@rive-app/react-webgl'
import { useSpring } from 'framer-motion'
import { FC, useEffect, useRef, useState } from 'react'

const RiveArtboard: FC<{
  src: string
  artboard: string
  layourFit?: string
}> = ({ src, artboard }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { rive, RiveComponent } = useRive({
    src: src,
    artboard: artboard,
    stateMachines: ['State Machine 1'], // Replace with your actual state machine name
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
    autoplay: true,
  })

  // Inputs for controlling the position of each part
  const half1X = useStateMachineInput(rive, 'State Machine 1', 'half1X')
  const half1Y = useStateMachineInput(rive, 'State Machine 1', 'half1Y')
  const half2X = useStateMachineInput(rive, 'State Machine 1', 'half2X')
  const half2Y = useStateMachineInput(rive, 'State Machine 1', 'half2Y')

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const xSpring = useSpring(0, { stiffness: 300, damping: 70 })
  const ySpring = useSpring(0, { stiffness: 300, damping: 70 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    // Normalize the mouse position relative to the viewport size (0 to 1)
    const normalizedX = mousePosition.x / window.innerWidth
    const normalizedY = mousePosition.y / window.innerHeight

    // Convert normalized values to a range suitable for Rive, e.g., -100 to 100
    const xValue = normalizedX * 200 - 100
    const yValue = normalizedY * 200 - 100

    xSpring.set(xValue)
    ySpring.set(yValue)
  }, [mousePosition])

  useEffect(() => {
    if (!half1X || !half1Y || !half2X || !half2Y) {
      console.error('One or more inputs are not found:', {
        half1X,
        half1Y,
        half2X,
        half2Y,
      })
      return
    }

    xSpring.on('change', (value) => {
      if (half1X) half1X.value = value
      if (half2X) half2X.value = value
    })

    ySpring.on('change', (value) => {
      if (half1Y) half1Y.value = value
      if (half2Y) half2Y.value = value
    })
  }, [xSpring, ySpring, half1X, half1Y, half2X, half2Y])

  return (
    <div
      ref={ref}
      style={{ width: '100%', height: '380px', overflow: 'hidden' }}
    >
      <RiveComponent
        style={{ width: '100%', height: '100%', overflow: 'hidden' }}
      />
    </div>
  )
}

export default RiveArtboard
