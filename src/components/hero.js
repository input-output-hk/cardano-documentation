import React from 'react'
import Button from './mdxComponents/button'
import Link from './link'
import styled from '@emotion/styled'
import Breakout from './Breakout'

import cardanoDots from './images/cardanoDots.svg'
import heroImg from './images/hero-image.png'

const StyledHero = styled.div`
  .heroHeading {
    display: flex;
    flex-flow: column;
    flex-direction: column-reverse;
    * {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
  margin-top: -3rem !important;
  .breakout {
    position: relative;
    overflow: hidden;
    &:before {
      content: '';
      background: url(${heroImg}) no-repeat center center;
      position: absolute;
      z-index: 1;
      top: 0;
      left: 50%;
      background-size: 90%;
      height: 100%;
      width: 900px;
    }
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      width: 1200px;
      height: 100%;
      background-size: cover;
      background: url(${cardanoDots}) no-repeat center center;
    }
    @media (max-width: 959px) {
      &:before {
        content: none;
      }
      &:after {
        top: -40%;
        right: -50%;
        width: 100%;
        z-index: -1;
      }
    }
  }

  .site-hero {
    max-width: 71.25rem;
    margin: 0 auto;
    padding: 6rem 0 4rem 0;
    @media (max-width: 1220px) {
      max-width: 87vw;
    }
    .heading-msg {
      width: 50%;
      text-align: left;
      h1 {
        line-height: 1;
        margin-bottom: 2rem;
      }
      p {
        font-weight: 400;
        font-size: 1rem;
        line-height: 1.4;
        margin-bottom: 2.5rem;
      }
      p.lead {
        font-size: 1.3rem;
      }
    }
    @media (max-width: 959px) {
      padding: 2rem 0 3rem 0;
      max-width: 87vw;
      background-size: 300px;
      .heading-msg {
        width: 100%;
        h1 {
          max-width: 100%;
        }
        p.lead {
          font-size: 1.14rem;
        }
      }
    }
  }
`

const Hero = ({ heading, subHeading, lead, text, label, ctalink, theme }) => {
  return (
    <StyledHero>
      <Breakout className="breakout" bgHiLight theme={theme}>
        <div className="site-hero">
          <div className="heading-msg">
            <div className="heroHeading">
              <h1>{heading}</h1>
              <h2>{subHeading}</h2>
            </div>
            <p className="lead">{lead}</p>
            <p>{text}</p>
            <Link to={ctalink}>
              <Button btn="primary">{label}</Button>
            </Link>
          </div>
        </div>
      </Breakout>
    </StyledHero>
  )
}

export default Hero
