import { useRive, Layout, Fit, Alignment } from '@rive-app/react-webgl'
import { FC, useEffect, useRef } from 'react'

const RiveArtboard: FC<{
  src: string
  artboard: string
  layourFit?: string
}> = ({ src, artboard }) => {
  const ref = useRef<HTMLDivElement>(null)
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

  useEffect(() => {
    rive?.play()
  }, [rive])

  return (
    <div
      ref={ref}
      style={{ width: '100%', height: '450px', overflow: 'visible' }}
    >
      <RiveComponent
        style={{
          width: '70%',
          height: '100%',
          overflow: 'hidden',
        }}
      />
    </div>
  )
}

export default RiveArtboard
