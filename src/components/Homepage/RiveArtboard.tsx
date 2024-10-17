import {
  useRive,
  Layout,
  Fit,
  Alignment,
  useStateMachineInput,
} from '@rive-app/react-webgl'
import { useReduceMotion } from '@site/src/hooks/useReduceMotion'
import { useSpring } from 'framer-motion'
import { FC, useEffect, useRef } from 'react'

const RiveArtboard: FC<{
  src: string
  artboard: string
  layourFit?: string
}> = ({ src, artboard }) => {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReduceMotion()
  const { rive, RiveComponent } = useRive({
    src: src,
    stateMachines: 'State Machine 1',
    artboard: artboard,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
    autoplay: false,
    useOffscreenRenderer: true,
  })
  const x = useStateMachineInput(rive, 'State Machine 1', 'X')
  const y = useStateMachineInput(rive, 'State Machine 1', 'Y')

  const xSpring = useSpring(0, { stiffness: 300, damping: 70 })
  const ySpring = useSpring(0, { stiffness: 300, damping: 70 })

  useEffect(() => {
    if (reduceMotion) {
      rive?.pause()
    } else {
      rive?.play()
    }
  }, [rive, reduceMotion])

  useEffect(() => {
    if (!ref.current) return

    let active = true
    let context: any = window

    if (!context) return

    if (!x || !y) return
    x.value = 0
    y.value = 0

    let mouseListener = (e: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect()

      const normalizedX = ((e.clientX - rect!.left) / rect!.width) * 0.5
      const normalizedY = ((e.clientY - rect!.top) / rect!.height) * 0.5

      const xValue = Math.min(1, Math.max(0, normalizedX))
      const yValue = Math.min(1, Math.max(0, normalizedY))

      const xValueNormalized = xValue * 250 - 99
      const yValueNormalized = yValue * 250 - 99

      if (x && x.value !== undefined) {
        xSpring.set(xValueNormalized)
      }
      if (y && y.value !== undefined) {
        ySpring.set(yValueNormalized)
      }
    }

    xSpring.on('change', (value) => {
      if (active && x && x.value !== undefined) {
        x.value = value
      }
    })

    ySpring.on('change', (value) => {
      if (active && y && y.value !== undefined) {
        y.value = value
      }
    })

    context.addEventListener('mousemove', mouseListener)

    return () => {
      active = false
      context.removeEventListener('mousemove', mouseListener)
    }
  }, [ref, x, y])

  return (
    <div
      ref={ref}
      style={{ width: '100%', height: '450px', overflow: 'visible' }}
    >
      <RiveComponent
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      />
    </div>
  )
}

export default RiveArtboard
