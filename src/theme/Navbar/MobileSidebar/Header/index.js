import React from 'react'
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal'
import { translate } from '@docusaurus/Translate'
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle'
import IconClose from '@site/src/components/icons/Close.svg'
import NavbarLogo from '@theme/Navbar/Logo'
function CloseButton() {
  const mobileSidebar = useNavbarMobileSidebar()
  return (
    <button
      type="button"
      aria-label={translate({
        id: 'theme.docs.sidebar.closeSidebarButtonAriaLabel',
        message: 'Close navigation bar',
        description: 'The ARIA label for close button of mobile sidebar',
      })}
      className="clean-btn navbar-sidebar__close"
      onClick={() => mobileSidebar.toggle()}
    >
      <IconClose color="#fff" />
    </button>
  )
}
export default function NavbarMobileSidebarHeader() {
  return (
    <div className="navbar-sidebar__brand">
      <NavbarLogo />
      <NavbarColorModeToggle className="margin-right--md" />
      <CloseButton />
    </div>
  )
}
