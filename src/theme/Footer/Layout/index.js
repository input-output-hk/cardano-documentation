import React from 'react'
import clsx from 'clsx'
import Section from '@site/src/components/Homepage/Section'
import FooterLinkItem from '../LinkItem'
import { useLocation } from '@docusaurus/router'
export default function FooterLayout({ style, links, logo, copyright }) {
  const { pathname } = useLocation()
  return (
    <footer
      className={clsx(
        'footer',
        {
          'footer--dark': style === 'dark',
        },
        pathname === '/' ? 'footer-home' : 'footer-default',
      )}
    >
      <Section>
        <div className="footer-content">
          {links}
          {(logo || copyright) && (
            <div className="footer__bottom">{copyright}</div>
          )}
          <div className="footer-bottom-links">
            <li key={'bottom-1'} className="footer__item">
              <FooterLinkItem
                item={{
                  href: 'https://static.iohk.io/terms/iog-privacy-policy.pdf',
                  label: 'IOHK Privacy Policy',
                }}
              />
            </li>
            <li key={'bottom-2'} className="footer__item">
              <FooterLinkItem
                item={{
                  href: 'https://static.iohk.io/terms/iohktermsandconditions.pdf',
                  label: 'IOHK Terms & Conditions',
                }}
              />
            </li>
          </div>
        </div>
      </Section>
    </footer>
  )
}
