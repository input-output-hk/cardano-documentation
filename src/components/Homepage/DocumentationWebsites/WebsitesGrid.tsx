import * as React from 'react'
import styled from '@emotion/styled'

import GridSectionEntry from './GridSectionEntry'

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 1.5rem;
  padding-top: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    row-gap: 3rem;
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    row-gap: 1.5rem;
  }
`

const GridSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 767px) {
    :nth-child(3) {
      padding-top: 1.5rem;
    }
  }
`

const GridSectionHeading = styled.span`
  color: #1c1e21;

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  margin-bottom: 0.5rem;
`

const WebsitesGrid = () => (
  <StyledGrid>
    <GridSection>
      <GridSectionHeading>Core tech:</GridSectionHeading>
      <GridSectionEntry
        color={'#F1F5FF'}
        imgSrc={'assets/websites-grid/dev-portal.svg'}
        url={'https://developers.cardano.org/'}
        altText={'Cardano dev portal'}
        index={0}
      />
      <GridSectionEntry
        color={'#F1F5FF'}
        imgSrc={'assets/websites-grid/node-tests.svg'}
        url={'https://tests.cardano.intersectmbo.org/'}
        altText={'Cardano node tests'}
        index={4}
      />
    </GridSection>

    <GridSection>
      <GridSectionHeading>Smart contracts:</GridSectionHeading>
      <GridSectionEntry
        color={'#F1F5FF'}
        imgSrc={'assets/websites-grid/plinth.svg'}
        url={'https://plutus.cardano.intersectmbo.org/docs/'}
        altText={'Plinth docs'}
        index={1}
      />
      <GridSectionEntry
        color={'#511CF7'}
        imgSrc={'assets/websites-grid/marlowe.svg'}
        url={'https://docs.marlowe.iohk.io/docs/introduction'}
        altText={'Marlowe docs'}
        index={5}
      />
      <GridSectionEntry
        color={'#25272E'}
        imgSrc={'assets/websites-grid/aiken.png'}
        url={'https://aiken-lang.org/'}
        altText={'Aiken'}
        index={8}
      />
      <GridSectionEntry
        color={'#F1F5FF'}
        imgSrc={'assets/websites-grid/builder-tools.svg'}
        url={'https://developers.cardano.org/tools/'}
        altText={'Cardano dev portal builder tools'}
        index={10}
      />
    </GridSection>

    <GridSection>
      <GridSectionHeading>Scalability:</GridSectionHeading>
      <GridSectionEntry
        theme={
          'linear-gradient(90deg, rgba(93, 160, 180, 0.40) 0%, rgba(243, 215, 235, 0.40) 100%);'
        }
        imgSrc={'assets/websites-grid/hydra.svg'}
        url={'https://hydra.family/head-protocol/'}
        altText={'Hydra docs'}
        index={2}
      />
      <GridSectionEntry
        color={'#000000'}
        imgSrc={'assets/websites-grid/mythril.svg'}
        url={'https://mithril.network/doc/'}
        altText={'Mithril docs'}
        index={6}
      />
      <GridSectionEntry
        color={'rgba(32, 8, 48, 1)'}
        imgSrc={'assets/websites-grid/leios.svg'}
        url={'https://leios.cardano-scaling.org/'}
        altText={'Leios docs'}
        index={6}
      />
    </GridSection>

    <GridSection>
      <GridSectionHeading>Sustainability:</GridSectionHeading>
      <GridSectionEntry
        color={'#0128AA'}
        text={'Intersect'}
        url={'https://docs.intersectmbo.org/'}
        altText={'Intersect docs'}
        index={3}
      />
      <GridSectionEntry
        theme={'linear-gradient(90deg, #EAEFFD 0%, #FCF3F0 100%);'}
        imgSrc={'assets/websites-grid/gov-tool.svg'}
        url={'https://docs.gov.tools/'}
        altText={'Cardano Gov tool docs'}
        index={7}
      />
      <GridSectionEntry
        color={'rgba(42, 65, 232, 0.10)'}
        imgSrc={'assets/websites-grid/catalyst.svg'}
        url={'https://docs.projectcatalyst.io/'}
        altText={'Project catalyst'}
        index={9}
      />
    </GridSection>
  </StyledGrid>
)

export default WebsitesGrid
