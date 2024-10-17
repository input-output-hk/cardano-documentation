import React from 'react'
import { isMultiColumnFooterLinks } from '@docusaurus/theme-common'
import FooterLinksMultiColumn from '@theme/Footer/Links/MultiColumn'
import FooterLinksSimple from '@theme/Footer/Links/Simple'
export default function FooterLinks({ links, logo }) {
  return isMultiColumnFooterLinks(links) ? (
    <FooterLinksMultiColumn columns={links} logo={logo} />
  ) : (
    <FooterLinksSimple links={links} />
  )
}
