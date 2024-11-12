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
  margin-left: -2rem;
  margin-top: 1.6rem;
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
  overflow: hidden;
  max-width: 1248px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 32px;
  padding-bottom: 3.5rem;

  margin-top: -2.5rem;
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
        slidesPerView={1.2}
        spaceBetween={24}
        ref={sliderRef}
        style={{ width: '100%' }}
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
