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
  background-color: var(--ifm-breadcrumbs-background-color);
  padding: 0.5rem 2rem;
  display: flex;
  align-items: center;

  @media (max-width: 767px) {
    padding: 0.5rem 1.5rem;
  }
`

const DocContainer = styled.div`
  @media (min-width: 997px) {
    flex-grow: 1;
    max-width: calc(100% - var(--doc-sidebar-width));
  }
`

export default function DocRootLayoutMain({
  hiddenSidebarContainer,
  children,
}) {
  const sidebar = useDocsSidebar()
  return (
    <DocContainer>
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
    </DocContainer>
  )
}
