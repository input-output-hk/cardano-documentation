import React, { ComponentType, SVGProps } from 'react'
import Link from '@docusaurus/Link'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'

import ArrowRight from '../icons/ArrowRight.svg'

const StyledButton = styled.button`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  border: 0;
  cursor: pointer;
  text-decoration: none;
  background: none;
  color: var(--ifm-homepage-tile-link-color);
  gap: 0.625rem;
`

const StyledTile = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
  background-color: var(--ifm-homepage-tile-backdrop-color);
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

  @media (max-width: 767px) {
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

    @media (max-width: 767px) {
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
`

const IconWrapper = styled.div`
  min-height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 767px) {
    min-height: 75px;
  }
`

type Props = {
  heading: string
  text: string
  ctalink: string
  Icon?: ComponentType<SVGProps<SVGSVGElement> & { title?: string }>
  single?: boolean
  index?: number
}

const Tile: React.FC<Props> = ({ heading, text, ctalink, Icon, single }) => {
  return (
    <Link href={ctalink}>
      <StyledTile
        className={`tile`}
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
          <p className={`truncate ${single ? `heightAuto` : ''}`}>{text}</p>
          <Link to={ctalink}>
            <StyledButton>
              Discover more
              <ArrowRight className="button-arrow-right" />
            </StyledButton>
          </Link>
        </div>
      </StyledTile>
    </Link>
  )
}

export default Tile
