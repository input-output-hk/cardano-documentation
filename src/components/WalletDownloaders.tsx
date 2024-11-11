import React, { useEffect, useState, useRef } from 'react'

import Modal from '@material-ui/core/Modal'
import { TinyColor } from '@ctrl/tinycolor'
import Link from '@input-output-hk/front-end-core-components/components/Link'
import Markdown from '@input-output-hk/front-end-core-components/components/Markdown'
import { FaCogs } from 'react-icons/fa'
import DownloadIcon from '@site/src/components/icons/Download.svg'
import CopyIcon from '@site/src/components/icons/Copy.svg'
import { MdClose } from 'react-icons/md'

import testnetsTheme from './utils/testnetsTheme'
import content from './utils/testnetsContent'

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

  // const [platformsData, setPlatformsData] = useState(null)

  // const [loading, setLoading] = useState(true)

  // const [hasError, setHasError] = useState(false)

  const [activeModal, setActiveModal] = useState('')

  // const checksumRefs = {
  //   windows: useRef(null),
  //   darwin: useRef(null),
  //   linux: useRef(null),
  // }

  // const validateData = (data) => {
  //   if (!data.platforms) return false
  //   const validPlatforms = ['windows', 'darwin', 'linux']

  //   if (Object.keys(data.platforms).length !== validPlatforms.length)
  //     return false
  //   let valid = true

  //   validPlatforms.forEach((platform) => {
  //     if (!data.platforms[platform]) {
  //       valid = false
  //     } else {
  //       const validKeys = ['signature', 'hash', 'URL', 'version', 'SHA256']

  //       if (Object.keys(data.platforms[platform]).length !== validKeys.length) {
  //         valid = false
  //       } else {
  //         validKeys.forEach((key) => {
  //           if (
  //             typeof data.platforms[platform][key] !== 'string' ||
  //             !data.platforms[platform][key]
  //           )
  //             valid = false
  //         })
  //       }
  //     }
  //   })

  //   return valid
  // }

  // const loadDaedalusData = async () => {
  //   try {
  //     setLoading(true)

  //     const result = await fetch(envs[env].endpoint)

  //     const jsonResult = await result.json()
  //     if (!validateData(jsonResult)) throw new Error('Invalid data')
  //     setPlatformsData(
  //       Object.keys(jsonResult.platforms).map((platform) => ({
  //         ...jsonResult.platforms[platform],
  //         key: platform,
  //       })),
  //     )
  //     setLoading(false)
  //   } catch (error) {
  //     console.error(error.message, error)
  //     setHasError(true)
  //     setLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   loadDaedalusData()
  // }, [])

  // const getOrderedPlatforms = (order) => {
  //   const platforms = []

  //   order.forEach((platform) => {
  //     platforms.push(
  //       platformsData.filter(({ key }) => platform === key).shift(),
  //     )
  //   })

  //   return platforms.filter((platform) => Boolean(platform))
  // }

  // const checksumOnClick = (SHA256, platform) => (e) => {
  //   e.preventDefault()
  //   const el = checksumRefs[platform].current

  //   if (!el) return
  //   el.select()
  //   el.setSelectionRange(0, SHA256.length)
  //   navigator.clipboard.writeText(SHA256)
  // }

  // const openModal = (name) => (e) => {
  //   e.preventDefault()
  //   setActiveModal(name)
  // }

  // const getFilename = (URL) => URL.replace(/^.*\/(.*?)$/, '$1')

  // const renderTemplateString = (
  //   content,
  //   { SHA256, URL, version, hash, signature },
  // ) => {
  //   const params = {
  //     sha256: 'SHA256 checksum',
  //     version: '6.0.1',
  //     hash: '9bf726789218098',
  //     signature: 'signatrue',
  //     filename: 'dummy',
  //   }

  //   return content.replace(/{{\s?([^}\s]+)\s?}}/g, (original, key) => {
  //     return params[key] || original
  //   })
  // }

  // const getPGPFilename = (URL) => `${getFilename(URL)}.asc`

  // const getPGPBlob = (signature) => {
  //   if (window) {
  //     return window.Blob && new window.Blob([signature], { type: 'text/txt' })
  //   }
  // }

  // const getPGPSignatureHref = (signature) => {
  //   const blob = getPGPBlob(signature)

  //   return blob ? URL.createObjectURL(blob) : '#'
  // }

  const unCacheURL = (url) => {
    return url + '?t=' + new Date().getTime()
  }

  const dummyData = [
    {
      full_label: 'Mac OS 64 bit',
      short_label: 'Mac OS',
      key: '1',
      signature: '9bf726789218..098',
      hash: 'hash',
      URL: 'https://google.com',
      version: '6.0.1',
      SHA256: 'sha256',
    },
    {
      full_label: 'Linux 64 bit',
      short_label: 'Linux',
      key: '2',
      signature: '9bf726789218..098',
      hash: 'hash',
      URL: 'https://google.com',
      version: '6.0.1',
      SHA256: 'sha256',
    },
    {
      full_label: 'Windows 8.1 & 10, 64 bit',
      short_label: 'Windows',
      key: '3',
      signature: '9bf726789218..098',
      hash: 'hash',
      URL: 'https://google.com',
      version: '6.0.1',
      SHA256: 'sha256',
    },
  ]

  return (
    <div className="wallet-downloaders-wrapper">
      {/* {!hasError && !loading && platformsData && ( */}
      <>
        <h3>{envs[env].title}</h3>
        <div className="wallet-downloaders-container">
          {dummyData.map(
            ({
              key,
              signature,
              hash,
              URL,
              version,
              SHA256,
              full_label,
              short_label,
            }) => (
              <div className="wallet-download-box" key={key}>
                <span className="wallet-download-label">{full_label}</span>
                <span>
                  {version}: {version}
                </span>
                <a className="wallet-download-link" href={URL}>
                  {short_label}
                  <DownloadIcon />
                </a>
                <span>{'SHA256 checksum'}</span>
                <div className="wallet-download-copy-input-container">
                  <input
                    className="wallet-download-copy-input"
                    // ref={checksumRefs[key]}
                    title={'content.downloaders_content.copy_to_clipboard'}
                    aria-label={'content.downloaders_content.copy_to_clipboard'}
                    value={SHA256}
                    readOnly
                  />
                  {/* <Copy onClick={checksumOnClick(SHA256, key)}> */}
                  <button className="wallet-download-copy">
                    <CopyIcon />
                  </button>
                </div>
                <Link
                  href="#"
                  // onClick={openModal(`${key}_checksum`)}
                  tracking={{
                    category: gaCategory,
                    label: `view_checksum_instructions_${key}_${version}`,
                  }}
                >
                  Verify checksum
                </Link>
                <Modal
                  open={activeModal === `${key}_checksum`}
                  // onClose={openModal('')}
                  disableScrollLock
                >
                  <div className="wallet-download-modal-content">
                    {/* <CloseModal href="#" onClick={openModal('')}> */}
                    <Link className="wallet-download-modal-content-close">
                      <MdClose />
                    </Link>
                    <div className="wallet-download-modal-content-inner ">
                      {/* <Markdown
                          source={renderTemplateString(
                            content.downloaders_content[key]
                              .checksum_instructions,
                            { SHA256, signature, hash, URL, version },
                          )}
                        /> */}
                    </div>
                  </div>
                </Modal>
                <Link
                  // onClick={onDownloadPGPSignature(signature, URL)}
                  tracking={{
                    category: gaCategory,
                    label: `download_pgp_signature_${key}_${version}`,
                  }}
                  href={'https://google.com'}
                  // href={getPGPSignatureHref(signature)}
                  // download={getPGPFilename(URL)}
                >
                  {'PGP signature'}
                  <DownloadIcon />
                </Link>
                <Link
                  href="#"
                  // onClick={openModal(`${key}_pgp`)}
                  tracking={{
                    category: gaCategory,
                    label: `view_pgp_instructions_${key}_${version}`,
                  }}
                >
                  {'Verify signature'}
                </Link>
                <Modal
                  open={activeModal === `${key}_pgp`}
                  // onClose={openModal('')}
                  disableScrollLock
                >
                  <div className="wallet-download-modal-content">
                    {/* <CloseModal href="#" onClick={openModal('')}> */}
                    <Link className="wallet-download-modal-content-close">
                      <MdClose />
                    </Link>
                    <div className="wallet-download-modal-content-inner ">
                      {/* <Markdown
                            source={renderTemplateString(
                              content.downloaders_content[key]
                                .signature_instructions,
                              { SHA256, signature, hash, URL, version },
                            )}
                          /> */}
                    </div>
                  </div>
                </Modal>
              </div>
            ),
          )}
        </div>
      </>
      {/* )} */}
      {/* {loading && (
        <div className='wallet-loading-container'>
          <div>
            <CircularProgress />
          </div>
        </div>
      )} */}
      {/* {hasError && (
        <Box pl={12} pr={12}>
          <Typography variant="h1" color="error">
            <FaCogs />
          </Typography>
          <Typography variant="h3" color="error">
            {content.downloaders_content.no_releases_available}
          </Typography>
        </Box>
      )} */}
    </div>
  )
}

export default WalletDownloaders
