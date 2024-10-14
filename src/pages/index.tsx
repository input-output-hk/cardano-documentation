import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'

import Hero from '../components/Homepage/hero'

import ExploreGrid from '../components/Homepage/Explore/ExploreGrid'
import SectionHeading from '../components/Homepage/SectionHeading'
import SectionSubHeading from '../components/Homepage/SectionSubHeading'
import useMediaQuery from '../hooks/useMediaQuery'
import ExploreMobileCarousel from '../components/Homepage/Explore/ExploreMobileCarousel'
import Section, { PaddingWrapper } from '../components/Homepage/Section'
import Backdrop from '../components/Homepage/Backdrop'
import WebsitesGrid from '../components/Homepage/DocumentationWebsites/WebsitesGrid'
import BackgroundFloatingRadials from '../components/Homepage/FloatingRadials/BackgroundFloatingRadials'
import exploreContent from '../components/Homepage/Explore/ExploreContent'

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  const isTabletUp = useMediaQuery('(min-width: 768px)')
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Discover Cardano – a decentralized third-generation proof-of-stake blockchain fueled by research-first principles. Dive into Cardano's documentation, featuring core concepts, explainers, and developer resources, to learn more about Cardano's innovative ecosystem."
    >
      <Hero
        heading="Documentation"
        subHeading="Cardano ecosystem"
        lead="Cardano is a decentralized, third-generation, proof-of-stake blockchain, native home to the ada cryptocurrency."
      />

      <Backdrop color="#0133AC">
        <BackgroundFloatingRadials />
        <Section>
          <PaddingWrapper>
            <SectionSubHeading color={'#fff'}>
              Explore, learn, create
            </SectionSubHeading>
            <SectionHeading color={'#fff'}>
              You can do wonderful things with Cardano
            </SectionHeading>
            {isTabletUp ? (
              <ExploreGrid>{exploreContent}</ExploreGrid>
            ) : (
              <ExploreMobileCarousel>{exploreContent}</ExploreMobileCarousel>
            )}
          </PaddingWrapper>
        </Section>
      </Backdrop>
      <Backdrop color="#fff">
        <Section>
          <PaddingWrapper>
            <SectionHeading color={'#1C1E21'}>
              Browse more documentation websites
            </SectionHeading>
            <WebsitesGrid />
          </PaddingWrapper>
        </Section>
      </Backdrop>
    </Layout>
  )
}
