import React from 'react'
import styled from '@emotion/styled'
import Section from './Section'
import RiveArtboard from './RiveArtboard'
import nodesRiv from '@site/static/assets/nodes.riv'

const StyledHero = styled.div`
  background-color: #002170;
  position: relative;
  padding: 6rem 0;
  overflow: hidden;

  .heroHeading {
    display: flex;
    flex-flow: column;
    flex-direction: column-reverse;
    * {
      color: #ffffff;
    }
  }
  a {
    text-decoration: none;
  }

  .site-hero {
    @media (max-width: 767px) {
      margin: 9.625rem -0.5rem -3.75rem -0.5rem;
    }
    .heading-msg {
      width: 50%;
      text-align: left;
      color: #fff;

      @media (max-width: 767px) {
        width: 100%;
      }
      h1 {
        margin-bottom: 1rem;
        font-size: 2.25rem;
        font-weight: 600;
        line-height: normal;
        z-index: 1;
      }
      h2 {
        font-size: 1rem;
        line-height: 1.5rem;
        font-weight: 400;
        margin-bottom: 1rem;
        z-index: 1;
      }
      p {
        font-weight: 400;
        font-size: 1rem;
        line-height: 1.4;
        margin-bottom: 2.5rem;

        @media (max-width: 767px) {
          margin-bottom: 0;
        }
      }
      p.lead {
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.5rem;
        max-width: 450px;
      }
    }
  }
`

const RiveContainer = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto 0;
  right: -300px;
  top: 0;

  @media (max-width: 1024px) {
    top: 0px;
    right: -200px;
  }

  @media (max-width: 767px) {
    top: -100px;
    right: -25%;
  }
`

type Props = {
  heading: string
  subHeading: string
  lead: string
}

const Hero: React.FC<Props> = ({ heading, subHeading, lead }) => {
  return (
    <>
      <StyledHero>
        <RiveContainer>
          <RiveArtboard artboard={'Nodes'} src={nodesRiv} layourFit="cover" />
        </RiveContainer>
        <Section>
          <div className="site-hero">
            <div className="heading-msg">
              <div className="heroHeading">
                <h1>{heading}</h1>
                <h2>{subHeading}</h2>
              </div>
              <p className="lead">{lead}</p>
            </div>
          </div>
        </Section>
      </StyledHero>
    </>
  )
}

export default Hero
