import React from 'react'
import { Link } from '../components'
import Button from '../components/mdxComponents/button'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'

const glitchAnim = keyframes`
  0% {
    clip: rect(105px, 9999px, 120px, 0);
  }
  4.166666666666666% {
    clip: rect(64px, 9999px, 110px, 0);
  }
  8.333333333333332% {
    clip: rect(23px, 9999px, 49px, 0);
  }
  12.5% {
    clip: rect(104px, 9999px, 5px, 0);
  }
  16.666666666666664% {
    clip: rect(142px, 9999px, 37px, 0);
  }
  20.833333333333336% {
    clip: rect(7px, 9999px, 92px, 0);
  }
  25% {
    clip: rect(127px, 9999px, 55px, 0);
  }
  29.166666666666668% {
    clip: rect(16px, 9999px, 132px, 0);
  }
  33.33333333333333% {
    clip: rect(136px, 9999px, 119px, 0);
  }
  37.5% {
    clip: rect(0px, 9999px, 92px, 0);
  }
  41.66666666666667% {
    clip: rect(83px, 9999px, 134px, 0);
  }
  45.83333333333333% {
    clip: rect(92px, 9999px, 124px, 0);
  }
  50% {
    clip: rect(114px, 9999px, 150px, 0);
  }
  54.166666666666664% {
    clip: rect(5px, 9999px, 110px, 0);
  }
  58.333333333333336% {
    clip: rect(79px, 9999px, 30px, 0);
  }
  62.5% {
    clip: rect(124px, 9999px, 28px, 0);
  }
  66.66666666666666% {
    clip: rect(90px, 9999px, 127px, 0);
  }
  70.83333333333334% {
    clip: rect(131px, 9999px, 127px, 0);
  }
  75% {
    clip: rect(34px, 9999px, 35px, 0);
  }
  79.16666666666666% {
    clip: rect(46px, 9999px, 118px, 0);
  }
  83.33333333333334% {
    clip: rect(106px, 9999px, 56px, 0);
  }
  87.5% {
    clip: rect(35px, 9999px, 138px, 0);
  }
  91.66666666666666% {
    clip: rect(84px, 9999px, 67px, 0);
  }
  95.83333333333334% {
    clip: rect(72px, 9999px, 86px, 0);
  }
  100% {
    clip: rect(143px, 9999px, 132px, 0);
  }
`

const glitchAnim2 = keyframes`
  6.666666666666667% {
    clip: rect(42px, 9999px, 16px, 0);
  }
  10% {
    clip: rect(128px, 9999px, 39px, 0);
  }
  13.333333333333334% {
    clip: rect(74px, 9999px, 139px, 0);
  }
  16.666666666666664% {
    clip: rect(33px, 9999px, 111px, 0);
  }
  20% {
    clip: rect(146px, 9999px, 60px, 0);
  }
  23.333333333333332% {
    clip: rect(25px, 9999px, 64px, 0);
  }
  26.666666666666668% {
    clip: rect(129px, 9999px, 56px, 0);
  }
  30% {
    clip: rect(44px, 9999px, 78px, 0);
  }
  33.33333333333333% {
    clip: rect(91px, 9999px, 105px, 0);
  }
  36.666666666666664% {
    clip: rect(149px, 9999px, 99px, 0);
  }
  40% {
    clip: rect(87px, 9999px, 15px, 0);
  }
  43.333333333333336% {
    clip: rect(56px, 9999px, 25px, 0);
  }
  46.666666666666664% {
    clip: rect(64px, 9999px, 81px, 0);
  }
  50% {
    clip: rect(92px, 9999px, 65px, 0);
  }
  53.333333333333336% {
    clip: rect(52px, 9999px, 41px, 0);
  }
  56.666666666666664% {
    clip: rect(125px, 9999px, 144px, 0);
  }
  60% {
    clip: rect(48px, 9999px, 109px, 0);
  }
  63.33333333333333% {
    clip: rect(69px, 9999px, 13px, 0);
  }
  66.66666666666666% {
    clip: rect(15px, 9999px, 57px, 0);
  }
  70% {
    clip: rect(140px, 9999px, 98px, 0);
  }
  73.33333333333333% {
    clip: rect(143px, 9999px, 44px, 0);
  }
  76.66666666666667% {
    clip: rect(39px, 9999px, 62px, 0);
  }
  80% {
    clip: rect(148px, 9999px, 99px, 0);
  }
  83.33333333333334% {
    clip: rect(90px, 9999px, 119px, 0);
  }
  86.66666666666667% {
    clip: rect(46px, 9999px, 114px, 0);
  }
  90% {
    clip: rect(93px, 9999px, 68px, 0);
  }
  93.33333333333333% {
    clip: rect(16px, 9999px, 22px, 0);
  }
  96.66666666666667% {
    clip: rect(145px, 9999px, 16px, 0);
  }
  100% {
    clip: rect(13px, 9999px, 71px, 0);
  }
`

const Wrap = styled((props) => {
  return <div {...props} />
})`
  text-align: center;
  * {
    color: ${(props) => props.theme.colors.text};
  }
  button {
    color: #fff;
  }
  .space {
    margin: 2rem 0;
  }
`

const Glitch = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .glitch {
    font-size: 160px;
    font-weight: bold;
    text-transform: upercase;
    position: relative;
    display: inline-block;
  }
  .glitch::before,
  .glitch::after {
    content: '404';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: none;
  }
  .glitch::before {
    left: 2px;
    text-shadow: -2px 0 #33ffff;
    clip: rect(24px, 550px, 90px, 0);
    animation: ${glitchAnim2} 3s infinite linear alternate-reverse;
  }
  .glitch::after {
    left: -2px;
    text-shadow: -2px 0 #ff3399;
    clip: rect(85px, 550px, 140px, 0);
    animation: ${glitchAnim} 2.5s infinite linear alternate-reverse;
  }
`

const NotFoundPage = () => (
  <Layout>
    <Helmet>
      <title>Error page</title>
      <meta name="description" content="Error Page" />
    </Helmet>
    <Wrap>
      <h1>Error&hellip;</h1>
      <Glitch className="glitch-wrapper">
        <div className="glitch">404</div>
      </Glitch>
      <p className="space">You just found a page that doesn&#39;t exist...</p>
      <p className="space">
        <Link to="/">
          <Button primary>Go Home</Button>
        </Link>
      </p>
    </Wrap>
  </Layout>
)

export default NotFoundPage
