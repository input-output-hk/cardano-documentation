import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'

import Link from '../components/link'
import Layout from '../components/layout'
import NextPrevious from '../components/NextPrevious'
import config from '../../config'
import {
  Edit,
  StyledHeading,
  StyledMainWrapper,
} from '../components/styles/Docs'

import styled from '@emotion/styled'
import { canonicalUrl } from '../utils/canonicalUrl'
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react'

const forcedNavOrder = config.sidebar.forcedNavOrder

const StyledTemplate = styled.div`
  .pageWrap {
    max-width: 750px;
  }
  .pageWrap.fullWidthPage {
    max-width: 71.25rem;
    margin: 0 auto;
    @media (max-width: 1220px) {
      max-width: 87vw;
    }
  }
`

const TitleElement = styled.div`
  /* &.fullWidthPage {
    max-width:60rem;
    margin: 0 auto;
  } */
`

const instance = createInstance({
  urlBase: 'https://matomo.cw.iog.io/',
  siteId: 55,
})

export default class MDXRuntimeTest extends Component {
  render() {
    const { data } = this.props

    if (!data) {
      return this.props.children
    }
    const {
      allMdx,
      mdx,
      site: {
        // eslint-disable-next-line no-unused-vars
        siteMetadata: { docsLocation, title },
      },
    } = data

    const gitHub = require('../components/images/github.svg')

    const navItems = allMdx.edges
      .map(({ node }) => node.fields.slug)
      .filter(slug => slug !== '/')
      .sort()
      .reduce(
        (acc, cur) => {
          if (forcedNavOrder.find(url => url === cur)) {
            return { ...acc, [cur]: [cur] }
          }

          let prefix = cur.split('/')[1]

          if (config.gatsby && config.gatsby.trailingSlash) {
            prefix = prefix + '/'
          }

          if (prefix && forcedNavOrder.find(url => url === `/${prefix}`)) {
            return { ...acc, [`/${prefix}`]: [...acc[`/${prefix}`], cur] }
          } else {
            return { ...acc, items: [...acc.items, cur] }
          }
        },
        { items: [] },
      )

    const nav = forcedNavOrder
      .reduce((acc, cur) => {
        return acc.concat(navItems[cur])
      }, [])
      .concat(navItems.items)
      .map(slug => {
        if (slug) {
          const { node } = allMdx.edges.find(
            ({ node }) => node.fields.slug === slug,
          )

          return { title: node.fields.title, url: node.fields.slug }
        }
      })

    // template & meta tags
    const metaTitle = mdx.frontmatter.metaTitle

    const metaDescription = mdx.frontmatter.metaDescription

    const isFullWidth = mdx.frontmatter.fullWidthTemplate

    const hasPageHeading = mdx.frontmatter.hasPageHeading

    return (
      <MatomoProvider value={instance}>
        <StyledTemplate useFwTemplate={isFullWidth}>
          <Layout {...this.props} useFwTemplate={isFullWidth}>
            <Helmet>
              {metaTitle ? <title>{metaTitle}</title> : null}
              {metaTitle ? <meta name="title" content={metaTitle} /> : null}
              {metaDescription ? (
                <meta name="description" content={metaDescription} />
              ) : null}
              {metaTitle ? (
                <meta property="og:title" content={metaTitle} />
              ) : null}
              {metaDescription ? (
                <meta property="og:description" content={metaDescription} />
              ) : null}
              {metaTitle ? (
                <meta property="twitter:title" content={metaTitle} />
              ) : null}
              {metaDescription ? (
                <meta
                  property="twitter:description"
                  content={metaDescription}
                />
              ) : null}
              <link rel="canonical" href={canonicalUrl(mdx.fields.slug)} />
            </Helmet>

            <div className={`pageWrap ${isFullWidth ? `fullWidthPage` : ``}`}>
              {(hasPageHeading || hasPageHeading === null) && (
                <TitleElement className={`titleWrapper`}>
                  <StyledHeading>{mdx.fields.title}</StyledHeading>
                  {!isFullWidth && (
                    <Edit className={'mobileView'}>
                      {docsLocation && (
                        <Link
                          className={'gitBtn'}
                          to={`${docsLocation}/${mdx.parent.relativePath}`}
                        >
                          <img src={gitHub} alt={'Github logo'} /> Edit on
                          GitHub
                        </Link>
                      )}
                    </Edit>
                  )}
                </TitleElement>
              )}

              <StyledMainWrapper>
                <MDXRenderer>{mdx.body}</MDXRenderer>
              </StyledMainWrapper>
            </div>

            {!isFullWidth && (
              <div className={'addPaddTopBottom'}>
                <NextPrevious mdx={mdx} nav={nav} />
              </div>
            )}
          </Layout>
        </StyledTemplate>
      </MatomoProvider>
    )
  }
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        title
        docsLocation
      }
    }
    mdx(fields: { id: { eq: $id } }) {
      fields {
        id
        title
        slug
      }
      body
      tableOfContents
      parent {
        ... on File {
          relativePath
        }
      }
      frontmatter {
        metaTitle
        metaDescription
        fullWidthTemplate
        hasPageHeading
      }
    }
    allMdx {
      edges {
        node {
          fields {
            slug
            title
          }
        }
      }
    }
  }
`
