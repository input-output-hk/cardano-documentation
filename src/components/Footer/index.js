import React from 'react'
import styled from 'styled-components'
import { FaTwitter, FaFacebookF, FaYoutube, FaRss } from 'react-icons/fa'
import { DiGithubBadge } from 'react-icons/di'
import Markdown from '@input-output-hk/front-end-core-components/components/Markdown'
import Image from '@input-output-hk/front-end-core-components/components/Image'
import Link from '@input-output-hk/front-end-core-components/components/Link'

import data from '../content/footer-data.js'
import logo from '../images/cardano-logo.svg'
// Why does theme not work in this file?

const FooterSection = styled.footer`
  background-color: #1d1e21;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  width: 100%;
  padding: 3rem 16px;
  margin: 2rem auto 0 auto;
  p,
  a {
    color: #a7a9ab;
  }
  *,
  a {
    font-size: 14px;
  }
  a img {
    display: none;
  }
  a:hover {
    color: #fff;
  }
  hr {
    border: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.5);
    margin-bottom: 1.5rem;
  }
  strong {
    color: #fff;
  }
  @media (max-width: 767px) {
    opacity: 1;
    padding: 2rem;
    > div > div {
      margin: 0;
    }
    a div {
      padding: 0 !important;
    }
  }
`

const TopRow = styled.div`
  display: flex;

  > div {
    flex: 1;

    &:last-of-type {
      flex: 1.5;
    }
  }

  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`

const BottomRow = styled.div`
  display: flex;

  > div {
    flex: 1;

    &:first-of-type {
      flex: 1.1;
      margin-right: 1rem;
    }

    &:last-of-type {
      display: flex;
      margin-left: 1rem;
    }
  }

  @media screen and (max-width: 900px) {
    flex-direction: column;

    > div {
      &:first-of-type,
      &:last-of-type {
        margin: 0;
      }
    }
  }

  @media screen and (max-width: 400px) {
    > div:last-of-type {
      flex-direction: column;
    }
  }
`

const Copyright = styled.div`
  display: flex;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;

    > a {
      margin-top: 0.2rem;
    }

    &:first-of-type {
      margin-right: 1rem;
    }
  }
`

const TopRight = styled.div`
  display: flex;
  justify-content: flex-end;

  @media screen and (max-width: 700px) {
    justify-content: flex-start;
  }

  @media screen and (max-width: 400px) {
    flex-direction: column;
  }
`

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 2rem;
  flex-direction: row;

  img {
    width: 5rem;
  }

  > a {
    display: flex;
    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;

      &:last-of-type {
        padding-left: 1rem;
        flex-grow: 1;
      }
    }
  }

  @media screen and (max-width: 400px) {
    justify-content: flex-start;
    margin-bottom: 1rem;
  }
`

const SocialLinks = styled.div`
  display: flex;
  color: #fff;
`

const SocialLink = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 1rem;
  color: #fff !important;
  a,
  svg {
    color: #fff !important;
  }
`

const LinksColumn = styled.div`
  flex: 1;

  ul {
    list-style: none;
    padding: 0;
    margin: 1rem 0 0;
  }
`

const Footer = ({ theme }) => {
  const content = data.content
  let logoURL = 'https://ucarecdn.com/75b74f03-ff04-47ba-821c-5e477d3d46d4/'

  return (
    <FooterSection theme={theme}>
      <TopRow>
        <Copyright>
          <div>
            <p>© IOHK 2015 - {new Date().getFullYear()}</p>
          </div>
          <div>
            <Link
              rel="noopener"
              title="Input Output HK GitHub"
              href="https://github.com/input-output-hk"
            >
              <DiGithubBadge size={25} />
            </Link>
          </div>
        </Copyright>
        <TopRight>
          <Logo>
            <Link
              rel="noopener"
              href="https://iohk.io/"
              title="Input Output HK"
            >
              <div>
                <Image
                  src={logoURL}
                  alt="IOHK logo"
                  sizeFactor={0.14}
                  maintainTransparency
                />
              </div>
              <div>
                <p>IOHK supported project</p>
              </div>
            </Link>
          </Logo>
          <SocialLinks>
            <SocialLink>
              <Link
                title="Input Output HK Twitter"
                rel="noopener"
                href="https://twitter.com/inputoutputHK"
              >
                <FaTwitter size={20} />
              </Link>
            </SocialLink>
            <SocialLink>
              <Link
                title="Input Output HK Facebook"
                rel="noopener"
                href="https://www.facebook.com/iohk.io/"
              >
                <FaFacebookF size={20} />
              </Link>
            </SocialLink>
            <SocialLink>
              <Link
                title="Input Output HK YouTube"
                rel="noopener"
                href="https://www.youtube.com/c/IohkIo"
              >
                <FaYoutube size={20} />
              </Link>
            </SocialLink>
            <SocialLink>
              <Link
                title="Input Output HK Blog"
                rel="noopener"
                href="https://iohk.io/blog/"
              >
                <FaRss size={20} />
              </Link>
            </SocialLink>
          </SocialLinks>
        </TopRight>
      </TopRow>
      <hr />
      <BottomRow>
        <div style={{ marginBottom: '1rem' }}>
          <img src={logo} alt="Cardano Logo" style={{ marginBottom: '1rem' }} />
          <Markdown source={content.body} />
        </div>
        <div>
          <LinksColumn>
            <p>
              <strong>{content.cardanoLinks.title}</strong>
            </p>
            <ul>
              {content.cardanoLinks.links.map(({ href, label }) => (
                <li key={`${href}_${label}`}>
                  <Link href={href} rel="noopener">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </LinksColumn>
          <LinksColumn>
            <p>
              <strong>{content.communityLinks.title}</strong>
            </p>
            <ul>
              {content.communityLinks.links.map(({ href, label }) => (
                <li key={`${href}_${label}`}>
                  <Link href={href} rel="noopener">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </LinksColumn>
          <LinksColumn>
            <p>
              <strong>{content.legalLinks.title}</strong>
            </p>
            <ul>
              {content.legalLinks.links.map(({ href, label }) => (
                <li key={`${href}_${label}`}>
                  <Link href={href} rel="noopener" target="_blank">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </LinksColumn>
        </div>
      </BottomRow>
    </FooterSection>
  )
}

export default Footer
