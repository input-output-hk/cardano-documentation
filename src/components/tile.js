import React from 'react'
import Button from './mdxComponents/button'
import Link from './link'
import styled from '@emotion/styled'

import SpaceDots from './images/cardano-zoom-white.png'

const StyledTile = styled.div`
  > * {
    margin-bottom: 1rem;
  }
  height: 100%;
  display: flex;
  flex-direction: column;
  > div {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  svg {
    max-width: 3rem;
    color: ${props => props.theme.colors.link};
  }
  img {
    width: 50px;
    height: 45px;
  }
  a {
    padding-top: 1rem;
    margin-top: auto;
  }
  p {
    position: relative;
    overflow: hidden;
  }
  p.heightAuto {
    height: auto;
  }
  @media (max-width: 1100px) {
    margin: 0;
  }
  h3 {
    margin: 0.5rem 0;
  }
  ${props =>
    props.bannerTile &&
    `display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    background-image: url(${SpaceDots}), linear-gradient(to right, #0033ad 7%, #335cbe 94%);
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
      color: ${props.theme.colors.background};
      margin: 0 auto 1rem auto;
    }
    a, button {
      margin: 0 auto;
    }`}
  ${props =>
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

const Tile = ({
  heading,
  text,
  label,
  ctalink,
  icon,
  single,
  bannerTile,
  boxedTile,
  btn,
  theme,
}) => {
  return (
    <StyledTile
      className={`tile`}
      bannerTile={bannerTile}
      boxedTile={boxedTile}
      theme={theme}
      single={single}
      btn={btn}
    >
      <div>
        {icon ? <img src={icon} /> : ''}
        {bannerTile || boxedTile ? <h2>{heading}</h2> : <h3>{heading}</h3>}
        <p className={`truncate ${single ? `heightAuto` : ''}`}>{text}</p>
        <Link to={ctalink}>
          <Button btn={btn}>{label}</Button>
        </Link>
      </div>
    </StyledTile>
  )
}

export default Tile
