import React from 'react'
import LinkItem from '@theme/Footer/LinkItem'
import FooterLogo from '../../Logo'
import ContactHubspotForm from '@site/src/components/HubspotForm/ContactHubspotForm'

function ColumnLinkItem({ item }) {
  return item.html ? (
    <li
      className="footer__item"
      // Developer provided the HTML, so assume it's safe.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: item.html }}
    />
  ) : (
    <li key={item.href ?? item.to} className="footer__item">
      <LinkItem item={item} />
    </li>
  )
}
function Column({ column }) {
  return (
    <div className="col footer__col">
      <div className="footer__title">{column.title}</div>
      <ul className="footer__items clean-list">
        {column.items.map((item, i) => (
          <ColumnLinkItem key={i} item={item} />
        ))}
      </ul>
    </div>
  )
}
export default function FooterLinksMultiColumn({ columns, logo }) {
  return (
    <div className="row footer__links">
      <div className="col footer__col">
        <FooterLogo logo={logo} />
      </div>
      {columns.map((column, i) => (
        <Column key={i} column={column} />
      ))}
      <div className="col footer__col hubspot-form">
        <div className="footer__title">Subscribe to our newsletter</div>
        <ContactHubspotForm
          formId="fd033cc7-cfde-4dd1-ad5a-111418db5538"
          portalId="8848114"
          region="na1"
        />
      </div>
    </div>
  )
}
