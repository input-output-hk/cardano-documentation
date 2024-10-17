import React from 'react'
import clsx from 'clsx'
import { useDocsSidebar } from '@docusaurus/theme-common/internal'
import styles from './styles.module.css'
import DocBreadcrumbs from '@theme/DocBreadcrumbs'
import styled from '@emotion/styled'

const SubNav = styled.div`
  border-bottom: 1px solid #505660;
  width: 100%;
  z-index: 1;
  background-color: #fff;
  padding: 0.5rem 2rem;
  display: flex;
  align-items: center;

  @media (max-width: 767px) {
    padding: 0.5rem 1.5rem;
  }
`

export default function DocRootLayoutMain({
  hiddenSidebarContainer,
  children,
}) {
  const sidebar = useDocsSidebar()
  return (
    <div>
      <SubNav>
        <DocBreadcrumbs />
      </SubNav>
      <main
        className={clsx(
          (hiddenSidebarContainer || !sidebar) &&
            styles.docMainContainerEnhanced,
        )}
      >
        <div
          className={clsx(
            'container padding-top--md padding-bottom--lg',
            styles.docItemWrapper,
            hiddenSidebarContainer && styles.docItemWrapperEnhanced,
          )}
        >
          {children}
        </div>
      </main>
    </div>
  )
}
