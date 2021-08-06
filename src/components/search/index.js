import React, { useEffect } from 'react'
import styled from 'styled-components'
import docsearch from '@docsearch/js'
import config from '../../../config.js'

import '@docsearch/css'

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

export default function() {
  useEffect(() => {
    docsearch({
      container: '#algoliasearch',
      indexName: config.header.search.indexName,
      apiKey: config.header.search.algoliaApiKey,
      searchParameters: {
        facetFilters: ['tags:docs'],
      },
    })
  }, [])

  return (
    <SearchContainer>
      <div id="algoliasearch" />
    </SearchContainer>
  )
}
