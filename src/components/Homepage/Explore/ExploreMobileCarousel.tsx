import React, {
  ComponentPropsWithoutRef,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import BasicDot from '../../icons/dot.svg'

import 'swiper/css'
import styled from '@emotion/styled'

const DotContainer = styled.div`
  display: inline-flex;
  gap: 0.5rem;
  justify-content: center;
  bottom: 0;
`

const Dot = styled(BasicDot)<{ selected: boolean }>`
  ${(props) => (props.selected ? 'color: #FF7676' : 'color: #002170')};
`

const ControlButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`

type ControlProps = {
  showing: number
  onClickBullet: (nth: number) => void
  children: React.ReactNode[]
} & ComponentPropsWithoutRef<'div'>

const Controls: FC<ControlProps> = ({
  showing,
  onClickBullet,
  children,
  ...props
}) => {
  return (
    <DotContainer {...props}>
      {children.map((_, index) => (
        <ControlButton key={index} onClick={() => onClickBullet(index)}>
          <Dot selected={index === showing} />
        </ControlButton>
      ))}
    </DotContainer>
  )
}

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow: hidden;
`

type Props = {
  children: React.ReactNode[]
}

const MobileCarousel: FC<Props> = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef<any>(null)

  const updateIndex = useCallback(() => {
    setCurrentSlide(sliderRef.current?.swiper.realIndex)
  }, [])

  const handleClickBullet = useCallback((index: number) => {
    if (!sliderRef.current) return
    sliderRef.current.swiper.slideTo(index)
  }, [])

  useEffect(() => {
    const swiperInstance = sliderRef.current?.swiper

    if (swiperInstance) {
      swiperInstance.on('slideChange', updateIndex)
    }

    return () => {
      if (swiperInstance) {
        swiperInstance.off('slideChange', updateIndex)
      }
    }
  }, [updateIndex])

  return (
    <CarouselContainer>
      <Swiper
        slidesPerView={1.2} /* Show one slide at a time */
        spaceBetween={16} /* Adjust spacing between slides */
        ref={sliderRef} /* Center the slides */
        style={{ width: '100%' }} /* Ensure swiper takes full width */
      >
        {children &&
          children.map((child, index) => (
            <SwiperSlide key={index}>{child}</SwiperSlide>
          ))}
      </Swiper>
      <Controls
        onClickBullet={handleClickBullet}
        showing={currentSlide}
        children={children}
      />
    </CarouselContainer>
  )
}

export default MobileCarousel
