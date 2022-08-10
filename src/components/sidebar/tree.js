import React, { useEffect, useState } from 'react'
import config from '../../../config'
import TreeNode from './treeNode'
import stripNumbers from '../../utils/stripNumbersFromPath'

const calculateTreeData = edges => {
  const originalData = config.sidebar.ignoreIndex
    ? edges.filter(
        ({
          node: {
            fields: { slug },
          },
        }) => slug !== '/',
      )
    : edges

  const tree = originalData.reduce(
    (
      accu,
      {
        node: {
          frontmatter: { externalUrl },
          fields: { slug, title },
        },
      },
    ) => {
      const parts = slug.split('/')

      let { items: prevItems } = accu

      const slicedParts =
        config.gatsby && config.gatsby.trailingSlash
          ? parts.slice(1, -2)
          : parts.slice(1, -1)

      for (const part of slicedParts) {
        let tmp = prevItems && prevItems.find(({ label }) => label === part)

        if (tmp) {
          if (!tmp.items) {
            tmp.items = []
          }
        } else {
          tmp = { label: part, items: [] }
          prevItems.push(tmp)
        }
        prevItems = tmp.items
      }

      const slicedLength =
        config.gatsby && config.gatsby.trailingSlash
          ? parts.length - 2
          : parts.length - 1

      const existingItem = prevItems.find(
        ({ label }) => label === parts[slicedLength],
      )

      if (existingItem) {
        existingItem.url = slug
        existingItem.title = title
      } else {
        prevItems.push({
          label: parts[slicedLength],
          url: slug,
          items: [],
          title,
          externalUrl,
        })
      }

      // Sort Top Level Nav item numerically
      accu.items.map(() => {
        accu.items = accu.items.sort((a, b) => {
          return a.label > b.label ? 1 : b.label > a.label ? -1 : 0
        })
      })

      return accu
    },
    { items: [] },
  )

  const {
    sidebar: { forcedNavOrder = [] },
  } = config

  const tmp = [...forcedNavOrder]

  // if (config.gatsby && config.gatsby.trailingSlash) {}

  tmp.reverse()
  return tmp.reduce((accu, slug) => {
    const parts = slug.split('/')

    let { items: prevItems } = accu

    const slicedParts =
      config.gatsby && config.gatsby.trailingSlash
        ? parts.slice(1, -2)
        : parts.slice(1, -1)

    for (const part of slicedParts) {
      let tmp = prevItems.find(item => item && item.label == part)

      if (tmp) {
        if (!tmp.items) {
          tmp.items = []
        }
      } else {
        tmp = { label: part, items: [] }
        prevItems.push(tmp)
      }
      if (tmp && tmp.items) {
        prevItems = tmp.items
      }
    }

    // Sort Child Level Nav items numerically.
    prevItems.map(item => {
      if (item.items.length <= 0) return

      item.items = item.items.sort((a, b) => {
        return a.label > b.label ? 1 : b.label > a.label ? -1 : 0
      })

      item.items.map(item => {
        if (item.items.length <= 0) return

        item.items = item.items.sort((a, b) => {
          return a.label > b.label ? 1 : b.label > a.label ? -1 : 0
        })

        item.items.map(item => {
          if (item.items.length <= 0) return

          item.items = item.items.sort((a, b) => {
            return a.label > b.label ? 1 : b.label > a.label ? -1 : 0
          })
        })
      })

      // Original implementation below, keeping for now WIP
      // item.items = item.items.sort(function(a, b) {
      //   if (getNumbers(a.label) < getNumbers(b.label)) return -1;
      //   if (getNumbers(a.label) > getNumbers(b.label)) return 1;
      //   return 0;
      // });
    })
    const slicedLength =
      config.gatsby && config.gatsby.trailingSlash
        ? parts.length - 2
        : parts.length - 1

    const index = prevItems.findIndex(
      ({ label }) => label === parts[slicedLength],
    )

    if (prevItems.length) {
      accu.items.unshift(prevItems.splice(index, 1)[0])
    }

    return accu
  }, tree)
}

const Tree = ({ edges }) => {
  let [treeData] = useState(() => {
    return calculateTreeData(edges)
  })

  const defaultCollapsed = {}

  // NOTE: Following two functions edited to always collapse all inner and outer URL's

  const matchInnerUrl = (collapsedItems, navItem) => {
    navItem.map(item => {
      let matchUrl = stripNumbers(item.url)

      /* collapsedItems.map(a => {
        if (a === matchUrl) {
          defaultCollapsed[matchUrl] = true
        }
      }) */

      defaultCollapsed[matchUrl] = true

      item.items &&
        item.items.map(i => {
          let innerMatchUrl = stripNumbers(i.url)

          /* collapsedItems.map(b => {
            if (b === innerMatchUrl) {
              defaultCollapsed[innerMatchUrl] = true
            }
          }) */

          defaultCollapsed[innerMatchUrl] = true

          i.items &&
            i.items.map(x => {
              let innerInnerMatchUrl = stripNumbers(x.url)

              collapsedItems.map(c => {
                /*if (c === innerInnerMatchUrl) {
                  defaultCollapsed[innerInnerMatchUrl] = true
                }*/
                defaultCollapsed[innerInnerMatchUrl] = true
              })
            })
        })
    })
  }

  const matchOuterUrl = (collapsedItems, url) => {
    url = stripNumbers(url)

    /*collapsedItems.map(i => {
      if (i === url) {
        defaultCollapsed[url] = true
      }
    })*/

    defaultCollapsed[url] = true
  }

  treeData.items.forEach(item => {
    // Below controls wether to collapse navs, add items to config.collapsedNav if desired
    matchOuterUrl(config.sidebar.collapsedNav, item.url)
    matchInnerUrl(config.sidebar.collapsedNav, item.items)

    // Below is original implementation.. keeping for a while
    // if (config.sidebar.collapsedNav && config.sidebar.collapsedNav.includes(item.url)) {
    //   defaultCollapsed[item.url] = true;
    // }
    // else {
    //   defaultCollapsed[item.url] = false;
    // }
  })

  const [collapsed, setCollapsed] = useState(defaultCollapsed)

  const currentUrl =
    typeof window !== 'undefined' ? window.location.pathname : ''

  // The curent items parent should never be collapsed - this works when navigating prev/next and when accessing
  // a url directly.
  useEffect(() => {
    /**
     * expand sections depending the current URL
     * accumulate this in an object so that we update state only once
     * @type {Partial<typeof collapsed>}
     */
    let patchCollapsed = {};

    // Recursive function to loop through all levels of tree because we don't know how deep the tree might get
    const processItems = items =>
      items.forEach(item => {
        const strippedUrl = stripNumbers(item.url)

        if (currentUrl.startsWith(strippedUrl) && currentUrl !== strippedUrl) {
          patchCollapsed[strippedUrl] = false
        }

        // Call function recursively if it has children
        if (item.items?.length) processItems(item.items)
      })

    processItems(treeData.items)

    /* use function form to patch current state (not the initial state) */
    setCollapsed(collapsed => ({
      ...collapsed,
      ...patchCollapsed,
    }));
  }, [currentUrl])

  const toggle = url => {
    setCollapsed({
      ...collapsed,
      [url]: !collapsed[url],
    })
  }

  return (
    <>
      <TreeNode
        className={`${
          config.sidebar.frontLine ? 'showFrontLine' : 'hideFrontLine'
        } firstLevel`}
        setCollapsed={toggle}
        collapsed={collapsed}
        {...treeData}
      />
    </>
  )
}

export default Tree
