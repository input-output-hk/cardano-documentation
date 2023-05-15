import React, { useEffect } from 'react'
import styled from 'styled-components'
import docsearch from '@docsearch/js'
import config from '../../../config.js'

import '@docsearch/css'

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Search = () => {
  const { indexName, algoliaApiKey, algoliaAppId } = config.header.search

  useEffect(() => {
    if (indexName && algoliaApiKey && algoliaAppId) {
      docsearch({
        container: '#algoliasearch',
        indexName,
        apiKey: algoliaApiKey,
        appId: algoliaAppId,
        searchParameters: {
          facetFilters: ['tags:docs'],
        },
      })
    }
  }, [])

  return indexName && algoliaApiKey && algoliaAppId ? (
    <SearchContainer>
      <div id="algoliasearch" />
    </SearchContainer>
  ) : null
}

export default Search
