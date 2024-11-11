import React, { useEffect, useState, useRef } from 'react'

import Modal from '@material-ui/core/Modal'
import Link from '@input-output-hk/front-end-core-components/components/Link'
import Markdown from '@input-output-hk/front-end-core-components/components/Markdown'
import { FaCogs } from 'react-icons/fa'
import DownloadIcon from '@site/src/components/icons/Download.svg'
import CopyIcon from '@site/src/components/icons/Copy.svg'
import { MdClose } from 'react-icons/md'

import content from './utils/testnetsContent'
import { CircularProgress, Typography, Box } from '@material-ui/core'

const WalletDownloaders = ({ env }) => {
  const gaCategory = 'byron_daedalus_downloaders'

  const envs = {
    preprod: {
      endpoint:
        'https://lace-daedalus-preprod.s3.amazonaws.com/daedalus-latest-version.json',
      title: 'Pre-production Testnet',
    },
    preview: {
      endpoint:
        'https://lace-daedalus-preview.s3.amazonaws.com/daedalus-latest-version.json',
      title: 'Preview Testnet',
    },
  }

  const [platformsData, setPlatformsData] = useState(null)

  const [loading, setLoading] = useState(true)

  const [hasError, setHasError] = useState(false)

  const [activeModal, setActiveModal] = useState('')

  const checksumRefs = {
    windows: useRef(null),
    darwin: useRef(null),
    linux: useRef(null),
  }

  const validateData = (data) => {
    if (!data.platforms) return false
    const validPlatforms = ['windows', 'darwin', 'linux']

    if (Object.keys(data.platforms).length !== validPlatforms.length)
      return false
    let valid = true

    validPlatforms.forEach((platform) => {
      if (!data.platforms[platform]) {
        valid = false
      } else {
        const validKeys = ['signature', 'hash', 'URL', 'version', 'SHA256']

        if (Object.keys(data.platforms[platform]).length !== validKeys.length) {
          valid = false
        } else {
          validKeys.forEach((key) => {
            if (
              typeof data.platforms[platform][key] !== 'string' ||
              !data.platforms[platform][key]
            )
              valid = false
          })
        }
      }
    })

    return valid
  }

  const loadDaedalusData = async () => {
    try {
      setLoading(true)

      const result = await fetch(envs[env].endpoint)

      const jsonResult = await result.json()
      if (!validateData(jsonResult)) throw new Error('Invalid data')
      setPlatformsData(
        Object.keys(jsonResult.platforms).map((platform) => ({
          ...jsonResult.platforms[platform],
          key: platform,
        })),
      )
      setLoading(false)
    } catch (error) {
      console.error(error.message, error)
      setHasError(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDaedalusData()
  }, [])

  const getOrderedPlatforms = (order) => {
    const platforms = []

    order.forEach((platform) => {
      platforms.push(
        platformsData.filter(({ key }) => platform === key).shift(),
      )
    })

    return platforms.filter((platform) => Boolean(platform))
  }

  const checksumOnClick = (SHA256, platform) => (e) => {
    e.preventDefault()
    const el = checksumRefs[platform].current

    if (!el) return
    el.select()
    el.setSelectionRange(0, SHA256.length)
    document.execCommand('copy')
  }

  const openModal = (name) => (e) => {
    e.preventDefault()
    setActiveModal(name)
  }

  const getFilename = (URL) => URL.replace(/^.*\/(.*?)$/, '$1')

  const renderTemplateString = (
    content,
    { SHA256, URL, version, hash, signature },
  ) => {
    const params = {
      sha256: SHA256,
      version,
      hash,
      signature,
      filename: getFilename(URL),
    }

    return content.replace(/{{\s?([^}\s]+)\s?}}/g, (original, key) => {
      return params[key] || original
    })
  }

  const getPGPFilename = (URL) => `${getFilename(URL)}.asc`

  const getPGPBlob = (signature) =>
    window.Blob && new window.Blob([signature], { type: 'text/txt' })

  const getPGPSignatureHref = (signature) => {
    const blob = getPGPBlob(signature)

    return blob ? URL.createObjectURL(blob) : '#'
  }

  const onDownloadPGPSignature = (signature, URL) => (e) => {
    // @ts-ignore
    if (window.navigator.msSaveBlob || e.target.href === '#') e.preventDefault()
    // @ts-ignore
    if (window.navigator.msSaveBlob)
      // @ts-ignore
      window.navigator.msSaveBlob(getPGPBlob(signature), getPGPFilename(URL))
  }

  const unCacheURL = (url) => {
    return url + '?t=' + new Date().getTime()
  }

  return (
    <div className="wallet-downloaders-wrapper">
      {!hasError && !loading && platformsData && (
        <>
          <h3>{envs[env].title}</h3>
          <div className="wallet-downloaders-container">
            {getOrderedPlatforms(
              content.downloaders_content.platforms_order.map(
                (platform) => platform.platform_name,
              ),
            ).map(({ key, signature, hash, URL, version, SHA256 }) => (
              <div className="wallet-download-box" key={key}>
                <span className="wallet-download-label">
                  {content.downloaders_content[key].full_label}
                </span>
                <span>
                  {content.downloaders_content.version}: {version}
                </span>
                <a className="wallet-download-link" href={URL}>
                  {content.downloaders_content[key].short_label}
                  <DownloadIcon />
                </a>
                <span>{content.downloaders_content.sha_checksum}</span>
                <div className="wallet-download-copy-input-container">
                  <input
                    className="wallet-download-copy-input"
                    ref={checksumRefs[key]}
                    title={'content.downloaders_content.copy_to_clipboard'}
                    aria-label={'content.downloaders_content.copy_to_clipboard'}
                    value={SHA256}
                    readOnly
                  />
                  <button
                    onClick={checksumOnClick(SHA256, key)}
                    className="wallet-download-copy"
                  >
                    <CopyIcon />
                  </button>
                </div>
                <Link
                  href="#"
                  onClick={openModal(`${key}_checksum`)}
                  tracking={{
                    category: gaCategory,
                    label: `view_checksum_instructions_${key}_${version}`,
                  }}
                >
                  {content.downloaders_content.verify_checksum}
                </Link>
                <Modal
                  open={activeModal === `${key}_checksum`}
                  onClose={openModal('')}
                  disableScrollLock
                >
                  <div className="wallet-download-modal-content">
                    <Link
                      className="wallet-download-modal-content-close"
                      href="#"
                      onClick={openModal('')}
                    >
                      <MdClose />
                    </Link>
                    <div className="wallet-download-modal-content-inner ">
                      <Markdown
                        source={renderTemplateString(
                          content.downloaders_content[key]
                            .checksum_instructions,
                          { SHA256, signature, hash, URL, version },
                        )}
                      />
                    </div>
                  </div>
                </Modal>
                <Link
                  onClick={onDownloadPGPSignature(signature, URL)}
                  tracking={{
                    category: gaCategory,
                    label: `download_pgp_signature_${key}_${version}`,
                  }}
                  href={getPGPSignatureHref(signature)}
                  download={getPGPFilename(URL)}
                >
                  {content.downloaders_content.pgp_signature}
                  <DownloadIcon />
                </Link>
                <Link
                  href="#"
                  onClick={openModal(`${key}_pgp`)}
                  tracking={{
                    category: gaCategory,
                    label: `view_pgp_instructions_${key}_${version}`,
                  }}
                >
                  {content.downloaders_content.verify_signature}
                </Link>
                <Modal
                  open={activeModal === `${key}_pgp`}
                  onClose={openModal('')}
                  disableScrollLock
                >
                  <div className="wallet-download-modal-content">
                    <Link
                      href="#"
                      onClick={openModal('')}
                      className="wallet-download-modal-content-close"
                    >
                      <MdClose />
                    </Link>
                    <div className="wallet-download-modal-content-inner">
                      <Markdown
                        source={renderTemplateString(
                          content.downloaders_content[key]
                            .signature_instructions,
                          { SHA256, signature, hash, URL, version },
                        )}
                      />
                    </div>
                  </div>
                </Modal>
              </div>
            ))}
          </div>
        </>
      )}
      {loading && (
        <div className="wallet-loading-container">
          <div>
            <CircularProgress />
          </div>
        </div>
      )}
      {hasError && (
        <Box paddingTop={5}>
          <Typography variant="h1" color="error">
            <FaCogs />
          </Typography>
          <Typography variant="h3" color="error">
            {content.downloaders_content.no_releases_available}
          </Typography>
        </Box>
      )}
    </div>
  )
}

export default WalletDownloaders
