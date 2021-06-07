import React from 'react'
import styled from '@emotion/styled'
import { MDXProvider } from '@mdx-js/react'
import Footer from './Footer'
import ThemeProvider from './theme/themeProvider'
import mdxComponents from './mdxComponents'
import Sidebar from './sidebar'
import RightSidebar from './rightSidebar'
import config from '../../config.js'

const SiteWrap = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
`

const Wrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.background};

  .sideBarUL li a,
  .sectionHeading {
    cursor:pointer;
    color: ${({ theme }) => theme.colors.text};
  }

  .showFrontLine .active > a {
  }

  .sideBarUL .item > a:hover {
    background-color: rgba(0, 51, 173, 1);
    color: #fff !important;

    /* background: #F8F8F8 */
  }

  @media only screen and (max-width: 767px) {
    display: block;
  }
`

const Content = styled('main')`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  ${props => (props.fwTemplate ? `margin: 0 auto` : `margin: 0px 88px`)};
  padding-top: 3rem;
  height: auto;
  background: ${({ theme }) => theme.colors.background};

  table tr {
    background: ${({ theme }) => theme.colors.background};
  }

  @media only screen and (max-width: 1023px) {
    padding-left: 0;
    margin: 0 10px;
    padding-top: 3rem;
  }
`

const MaxWidth = styled('div')`
  @media only screen and (max-width: 50rem) {
    width: 100%;
    position: relative;
  }
`

const LeftSideBarWidth = styled('div')`
  width: 25rem;
`

const RightSideBarWidth = styled('div')`
  width: 20rem;
`

const Layout = ({ children, location, useFwTemplate }, theme) => (
  <ThemeProvider location={location}>
    <MDXProvider components={mdxComponents}>
      <SiteWrap>
        <Wrapper>
          {useFwTemplate ? (
            <Content fwTemplate={useFwTemplate}>
              <MaxWidth>{children}</MaxWidth>
            </Content>
          ) : (
            <>
              <LeftSideBarWidth className={'hiddenMobile'}>
                <Sidebar location={location} />
              </LeftSideBarWidth>
              {config.sidebar.title ? (
                <div
                  className={'sidebarTitle sideBarShow'}
                  dangerouslySetInnerHTML={{ __html: config.sidebar.title }}
                />
              ) : null}
              <Content>
                <MaxWidth>{children}</MaxWidth>
              </Content>
              <RightSideBarWidth className={'hiddenMobile'}>
                {location && <RightSidebar location={location} />}
              </RightSideBarWidth>
            </>
          )}
        </Wrapper>
        <Footer />
      </SiteWrap>
    </MDXProvider>
  </ThemeProvider>
)

export default Layout
