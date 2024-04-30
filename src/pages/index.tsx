import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'

import Breakout from '../components/Homepage/Breakout'
import Hero from '../components/Homepage/hero'

import CircuitIcon from '../components/images/circuit-icon.svg'
import DiamondsIco from '../components/images/diamonds-ico.svg'
import DocSpeechIco from '../components/images/doc-speech-ico.svg'
import IdeaIco from '../components/images/idea-ico.svg'
import Button from '../components/Homepage/button'
import Grid from '../components/Homepage/grid'
import GridItem from '../components/Homepage/gridItem'
import SiteWidthWrap from '../components/Homepage/SiteWidthWrap'
import Tile from '../components/Homepage/Tile'

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Discover Cardano – a decentralized third-generation proof-of-stake blockchain fueled by research-first principles. Dive into Cardano's documentation, featuring core concepts, explainers, and developer resources, to learn more about Cardano's innovative ecosystem."
    >
      <Hero
        heading="Cardano ecosystem"
        subHeading="Documentation for the"
        lead="Cardano is a decentralized third-generation proof-of-stake blockchain platform and home to the ada cryptocurrency. It has been designed from the ground up by a team of top engineers and academic experts."
        text="Cardano has a strong focus on sustainability, scalability, and transparency and is a fully open source project that aims to deliver an inclusive, fair, and resilient infrastructure for financial and social applications on a global scale. It is powered by Ouroboros, the ground-breaking proof-of-stake consensus protocol."
        label="Get started"
      />
      <Breakout className={'intro-container'} bgHiLight>
        <SiteWidthWrap className={'intro-sections-wrapper'}>
          <Grid bottomSpace="10">
            <GridItem flexFactor="48%" mobFlexFactor="48%" yspace="2">
              <Tile
                heading="3rd Gen"
                text="Cardano is the first blockchain platform to evolve out of a scientific philosophy and a research-first driven approach. It is being designed for function and scale right from the start."
                label="What is Cardano?"
                ctalink="/introduction"
                Icon={IdeaIco}
              />
            </GridItem>
            <GridItem flexFactor="48%" mobFlexFactor="48%" yspace="2">
              <Tile
                heading="Formally verified"
                text="The Cardano platform has been designed from the ground up and verified by an industry-leading combination of top engineers and academic experts in the fields of blockchain and cryptography. Cardano uses formal verification methods to ensure that the system behaves as designed."
                label="High assurance"
                ctalink="https://iohk.io/en/research/library/"
                Icon={DocSpeechIco}
              />
            </GridItem>
            <GridItem flexFactor="48%" mobFlexFactor="48%" yspace="2">
              <Tile
                heading="Secure, scalable, and interoperable"
                text="Security is one of the founding principles of Cardano. As it is written in the functional language Haskell, it uses pure functions to build the system, where components can be tested in isolation. More advanced features of Haskell, such as basing the implementation on formal and executable specifications, extensive property-based testing, and running tests in simulation provides a range of powerful methods for ensuring code correctness."
                label="More on security"
                ctalink="/evolution/cardano-design-rationale"
                Icon={DiamondsIco}
              />
            </GridItem>
            <GridItem flexFactor="48%" mobFlexFactor="48%" yspace="2">
              <Tile
                heading="Explore more"
                text="The high-level architecture of the Cardano platform stack is modular by design and includes various system components that interact together to fulfil different deployment use cases."
                label="Cardano architecture"
                ctalink="/explore-cardano/cardano-architecture"
                Icon={CircuitIcon}
              />
            </GridItem>
          </Grid>
        </SiteWidthWrap>
      </Breakout>
      <SiteWidthWrap className={'banner-wrapper'}>
        <Grid pullUp="-12">
          <GridItem flexFactor="100%" mobFlexFactor="100%" single yspace="2">
            <Tile
              bannerTile
              single
              heading="New to Cardano?"
              text="If you are new to Cardano and would like to learn more about the basics we have a range of explainers on the components of blockchain and how Cardano stands out from other solutions. From explanations on cryptocurrency and consensus and diving deeper into the types of wallets and delegation instructions, we aim to make your introduction to Cardano seamless and comprehensive."
              label="Get Started"
              ctalink="/new-to-cardano"
              btn="secondary"
            />
          </GridItem>
        </Grid>
        <Grid topSpace="-5">
          <GridItem flexFactor="48%" mobFlexFactor="48%" yspace="2">
            <Tile
              heading="Stake pool operators"
              text="Committed to the health and diversity of Cardano, stake pool operators (SPOs) act as the driving force of the ecosystem, being responsible for transaction processing and block production. Interested in running your own stake pool? Find out how to set up and operate a stake pool. "
              label="Learn more"
              ctalink="/operating-a-stake-pool/"
            />
          </GridItem>
        </Grid>
        <Grid bottomSpace="4" mobileBottomSpace="2">
          <GridItem flexFactor="48%" mobFlexFactor="48%" yspace="2">
            <Tile
              boxedTile
              heading="Stake pools"
              text="A stake pool is a reliable server node that focuses on maintenance and holds the combined stake of various stakeholders in a single entity."
              label="Stake pools explained"
              ctalink="/learn/stake-pools"
              btn="primary"
            />
          </GridItem>
          <GridItem flexFactor="48%" mobFlexFactor="48%" yspace="2">
            <Tile
              boxedTile
              heading="Delegation"
              text="Delegation of stake is a mechanism inherent in the Cardano proof of stake (PoS) protocol that allows the protocol to scale even in a setting where the set of stakeholders are highly distributed."
              label="Delegation explained"
              ctalink="/learn/delegation"
              btn="primary"
            />
          </GridItem>
        </Grid>
        <Grid>
          <GridItem flexFactor="100%" mobFlexFactor="100%">
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '5rem',
              }}
            >
              <a href="https://roadmap.cardano.org/en/">
                <Button btn="primary">Cardano's evolution</Button>
              </a>
            </div>
          </GridItem>
        </Grid>
      </SiteWidthWrap>
    </Layout>
  )
}
