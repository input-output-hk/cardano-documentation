const componentWithMDXScope = require('gatsby-plugin-mdx/component-with-mdx-scope')

const path = require('path')

const startCase = require('lodash.startcase')

const config = require('./config')

const stripNumbers = require('./src/utils/stripNumbersFromPath')

const { Octokit } = require("@octokit/core")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMdx {
              edges {
                node {
                  fields {
                    id
                  }
                  tableOfContents
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `,
      ).then(result => {
        if (result.errors) {
          console.log(result.errors) // eslint-disable-line no-console
          reject(result.errors)
        }

        // Create blog posts pages.
        result.data.allMdx.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.slug ? stripNumbers(node.fields.slug) : '/',
            component: path.resolve('./src/templates/docs.js'),
            context: {
              id: node.fields.id,
            },
          })
        })
      }),
    )
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        $components: path.resolve(__dirname, 'src/components'),
        buble: '@philpl/buble', // to reduce bundle size
      },
    },
  })
}

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-proposal-export-default-from',
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent)

    let value = parent.relativePath.replace(parent.ext, '')

    if (value === 'index') {
      value = ''
    }

    if (config.gatsby && config.gatsby.trailingSlash) {
      createNodeField({
        name: `slug`,
        node,
        value: value === '' ? `/` : `/${value}/`,
      })
    } else {
      createNodeField({
        name: `slug`,
        node,
        value: `/${value}`,
      })
    }

    createNodeField({
      name: 'id',
      node,
      value: node.id,
    })

    createNodeField({
      name: 'title',
      node,
      value: node.frontmatter.title || startCase(parent.name),
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
    type MdxFrontmatter {
      repoReadeMe: String!
    }
  `

  createTypes(typeDefs)
}

exports.createResolvers = ({ createResolvers }) => {
  const octokit = new Octokit();

  const getReadmeRetrievalResponse = async ( providedRepo ) => {
    const response = await octokit.request("GET /repos/{owner}/{repo}/readme", {
      owner: 'input-output-hk',
      repo: providedRepo
    });

    return Buffer.from(response.data.content, 'base64').toString('utf8');
  }

  const resolvers = {
    MdxFrontmatter: {
      repoReadeMe: {
        resolve(source) {
          if(source.repo) {
            return getReadmeRetrievalResponse(source.repo);
          } else {
            return ''
          }
        },
      },
    },
  }

  createResolvers(resolvers)
}
