import Tile from '../Tile'
import Education from '@site/static/assets/explore-grid/education.svg'
import Testnets from '@site/static/assets/explore-grid/testnets.svg'
import StakePoolOperators from '@site/static/assets/explore-grid/stake-pool-operators.svg'
import ExploreDeveloperResources from '@site/static/assets/explore-grid/explore-developer-resources.svg'
import LearnAboutCardano from '@site/static/assets/explore-grid/learn-about-cardano.svg'

const exploreContent = [
  <Tile
    heading="Learn about Cardano"
    text="Dive into Cardano's fundamentals, from beginner explainers to in-depth coverage of core concepts, architecture and networking, and the platform's evolution."
    ctalink="/about-cardano/introduction"
    Icon={LearnAboutCardano}
    index={1}
  />,
  <Tile
    heading="Explore developer resources"
    text="Learn about Cardano’s features and find references to developer resources, including guides and tutorials, to kickstart your development journey."
    ctalink="/developer-resources/welcome/"
    Icon={ExploreDeveloperResources}
    index={2}
  />,
  <Tile
    heading="Stake pool operations"
    text="Learn about stake pool operation basics, including node connectivity, keys, operational certificates, maintenance, and more, with references to detailed developer tutorials."
    ctalink="/stake-pool-operators/operating-a-stake-pool/"
    Icon={StakePoolOperators}
    index={3}
  />,
  <Tile
    heading="Testnets"
    text="Get started with Cardano's testnet environments and explore how to engage with them effectively."
    ctalink="/cardano-testnets/environments/"
    Icon={Testnets}
    index={4}
  />,
  <Tile
    heading="Education"
    text="Explore learning opportunities on Cardano, including details about the Plutus Pioneer program and upcoming educational resources."
    ctalink="/pioneer-programs/plutus-pioneers/"
    Icon={Education}
    index={5}
  />,
]

export default exploreContent
