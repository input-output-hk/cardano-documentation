import * as React from 'react'
import styled from '@emotion/styled'

import useBaseUrl from '@docusaurus/useBaseUrl'

import M from '@site/static/assets/websites-grid/mythril.svg'
import Link from '@docusaurus/Link'
import { motion } from 'framer-motion'

const StyledEntry = styled(motion.div)`
  ${(props) => props.color && `background-color: ${props.color};`}
  ${(props) => props.theme && `background: ${props.theme};`}
  display: flex;
  padding: 24px 16px;
  justify-content: center;
  height: 96px;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 0.25rem;

  transition: box-shadow 0.2s ease-in-out;

  :hover {
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.25);
  }
`

const BrandText = styled.span`
  color: #fff;
  font-family: 'Inter';
  font-size: 26px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`

type Props = {
  imgSrc?: string
  text?: string
  color?: string
  theme?: string
  url: string
  index: number
}

export const GridSectionEntry: React.FC<Props> = ({
  imgSrc,
  text,
  color,
  theme,
  url,
  index,
}) => (
  <Link href={url}>
    <StyledEntry
      color={color}
      theme={theme}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.1 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 100 },
      }}
    >
      {imgSrc && <img src={useBaseUrl(imgSrc)} />}
      {text && <BrandText>{text}</BrandText>}
    </StyledEntry>
  </Link>
)

export default GridSectionEntry
