import React, { ComponentType, SVGProps } from 'react'
import Link from '@docusaurus/Link'
import styled from '@emotion/styled'
import Button from './Button'
import { motion } from 'framer-motion'
import useMediaQuery from '@site/src/hooks/useMediaQuery'

import ArrowRight from '../icons/ArrowRight.svg'

const StyledTile = styled(motion.div)<{ bannerTile; boxedTile }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
  background-color: #1342b2;
  color: #fff;
  max-width: 364px;
  transition: box-shadow 0.2s ease-in-out;

  .button-arrow-right {
    transform: translateX(0);

    transition: transform 0.2s ease-in-out;
  }
  :hover {
    box-shadow: 0px 4px 18px 0px rgba(0, 0, 0, 0.16);

    .button-arrow-right {
      transform: translateX(40%);

      transition: transform 0.2s ease-in-out;
    }
  }

  @media (max-width: 768px) {
    max-width: 289px;
    height: 390px;
  }

  > div {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  svg {
    max-width: 3rem;
  }
  a {
    padding-top: 1.75rem;
    margin-top: auto;

    @media (max-width: 768px) {
      justify-self: flex-end;
    }
  }
  p {
    position: relative;
    margin-bottom: 0;
    font-size: 0.813rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.375rem;
    padding-bottom: 1.5rem;
  }
  p.heightAuto {
    height: auto;
  }

  h3 {
    font-size: 0.813rem;
    margin: 1rem 0 0.5rem 0;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5rem;
  }
  ${(props) =>
    props.bannerTile &&
    `display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    background-image: url(assets/cardano-zoom-white.png), linear-gradient(to right, #0033ad 7%, #335cbe 94%);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
    transform: translateY(-8rem);
    width: 100%;
    padding: 2rem 18rem 1rem 18rem;
    @media(max-width:959px) {
      padding: 2rem 8rem;
    }
    @media(max-width:767px) {
      padding: 1rem 2rem;
      margin-bottom: 2rem;
      transform: translateY(-10rem);
    }
    @media(max-width:1044px) {
      background-size: cover;
    }
    box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.24);
    > div {
      margin: 0 auto !important;
    }
    * {
      color: #fff;
      margin: 0 auto 1rem auto;
    }
    a, button {
      margin: 0 auto;
    }`}
  ${(props) =>
    props.boxedTile &&
    `border-radius: 0.5rem;
    padding: 1rem 2vw;
    text-align: center;
    box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.08);
    h2 {
      margin-bottom: 1rem;
    }
    button {
      min-width:10rem;
      margin:2rem auto 0 auto;
    }`}
`

const IconWrapper = styled.div`
  min-height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    min-height: 75px;
  }
`

type Props = {
  heading: string
  text: string
  ctalink: string
  Icon?: ComponentType<SVGProps<SVGSVGElement> & { title?: string }>
  single?: boolean
  bannerTile?: boolean
  boxedTile?: boolean
  btn?: 'primary' | 'secondary'
  index?: number
}

const Tile: React.FC<Props> = ({
  heading,
  text,
  ctalink,
  Icon,
  single,
  bannerTile,
  boxedTile,
  btn,
  index,
}) => {
  const isTabletUp = useMediaQuery('(min-width: 768px)')
  return (
    <Link href={ctalink}>
      <StyledTile
        className={`tile`}
        bannerTile={bannerTile}
        boxedTile={boxedTile}
        theme={'default'}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: 0.25 }}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 100 },
        }}
      >
        <div>
          {Icon ? (
            <IconWrapper>
              <Icon />
            </IconWrapper>
          ) : (
            ''
          )}
          {bannerTile || boxedTile ? <h2>{heading}</h2> : <h3>{heading}</h3>}
          <p className={`truncate ${single ? `heightAuto` : ''}`}>{text}</p>
          <Link to={ctalink}>
            <Button btn={btn}>
              Discover more
              <ArrowRight className="button-arrow-right" />
            </Button>
          </Link>
        </div>
      </StyledTile>
    </Link>
  )
}

export default Tile
