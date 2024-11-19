// @ts-nocheck
export default function () {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    gtag('js', new Date())
    gtag('config', 'G-C4Y892QLL8')
  }
}
