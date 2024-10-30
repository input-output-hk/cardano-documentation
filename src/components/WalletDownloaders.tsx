import React, { useEffect, useState, useRef } from 'react'
import Box from '@material-ui/core/Box'
import MuiButton from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import styled from 'styled-components'
import { TinyColor } from '@ctrl/tinycolor'
import Link from '@input-output-hk/front-end-core-components/components/Link'
import Markdown from '@input-output-hk/front-end-core-components/components/Markdown'
import { FaCogs } from 'react-icons/fa'
import DownloadIcon from '@site/src/components/icons/Download.svg'
import CopyIcon from '@site/src/components/icons/Copy.svg'
import { MdClose } from 'react-icons/md'

import testnetsTheme from './utils/testnetsTheme'
import content from './utils/testnetsContent'
import { CopyInputContainer, CopyInput, Copy } from './SharedComponents'

const LoadingContainer = styled.div`
  position: relative;
  width: 100%;
  height: 25rem;

  > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* flex-wrap: wrap; */
  gap: 0.5rem;

  @media (max-width: 767px) {
    flex-direction: column;
  }

  @media (max-width: 1240px) and (min-width: 1030px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`

const DownloadBox = styled.div`
  padding: 1.5rem 1rem 1.25rem 1rem;
  background-color: var(--controls-background-color);
  border-radius: 4px;
  font-size: 0.813rem;
  font-family: 'Chivo';
  font-weight: 400;
  line-height: 1.375rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: center;

  a {
    display: flex;
    justify-content: center;
    margin-bottom: 0.25rem;
    align-items: center;

    svg {
      margin-left: 0.25rem;
    }
  }
`

const MainLabel = styled.span`
  font-weight: 700;
  line-height: 1.5rem;
  padding-bottom: 0.25rem;
`

const DownloadButton = styled.a`
  font-family: 'Chivo';
  font-style: normal;
  font-weight: 400;
  line-height: 1.375rem;
  color: #fff !important;
  text-decoration: none !important;
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 360px;
  background-color: #1342b2;

  margin: 1rem 0 !important;

  svg {
    margin-left: 0.625rem;
  }
`

const ErrorContainer = styled(Box)`
  text-align: center;
`

const ModalContent = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  height: 100vh;
  max-height: 60rem;
  width: 100vw;
  max-width: 120rem;
  transform: translate(-50%, -50%);
  padding: 6rem;
  background-color: ${testnetsTheme.palette.background.paper};
`

const ModalContentInner = styled.div`
  overflow-y: auto;
  height: 100%;
  padding: 0.7rem;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 0.7rem;
  }

  &::-webkit-scrollbar-track {
    background: ${new TinyColor(testnetsTheme.palette.text.primary)
      .setAlpha(0.2)
      .toString()};
  }

  &::-webkit-scrollbar-thumb {
    background: ${new TinyColor(testnetsTheme.palette.text.primary)
      .setAlpha(0.5)
      .toString()};
    border-radius: 0.35rem;
  }
`

const CloseModal = styled(Link)`
  position: absolute;
  right: 1rem;
  top: 1rem;
  color: ${testnetsTheme.palette.text.primary};
  font-size: 3rem;

  &:hover {
    color: ${testnetsTheme.palette.text.primary};
  }
`

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
    <Box marginTop={4} marginBottom={4}>
      {/* {!hasError && !loading && platformsData && ( */}
      <>
        <h3>{envs[env].title}</h3>
        <Container>
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
              <DownloadBox key={key}>
                <MainLabel>{full_label}</MainLabel>
                <span>
                  {version}: {version}
                </span>
                <DownloadButton href={URL}>
                  {short_label}
                  <DownloadIcon />
                </DownloadButton>
                <span>{'SHA256 checksum'}</span>
                <CopyInputContainer>
                  <CopyInput
                    // ref={checksumRefs[key]}
                    title={'content.downloaders_content.copy_to_clipboard'}
                    aria-label={'content.downloaders_content.copy_to_clipboard'}
                    value={SHA256}
                    readOnly
                  />
                  {/* <Copy onClick={checksumOnClick(SHA256, key)}> */}
                  <Copy>
                    <CopyIcon />
                  </Copy>
                </CopyInputContainer>
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
                  <ModalContent>
                    {/* <CloseModal href="#" onClick={openModal('')}> */}
                    <CloseModal>
                      <MdClose />
                    </CloseModal>
                    <ModalContentInner>
                      {/* <Markdown
                          source={renderTemplateString(
                            content.downloaders_content[key]
                              .checksum_instructions,
                            { SHA256, signature, hash, URL, version },
                          )}
                        /> */}
                    </ModalContentInner>
                  </ModalContent>
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
                  <ModalContent>
                    {/* <CloseModal href="#" onClick={openModal('')}> */}
                    <CloseModal>
                      <MdClose />
                    </CloseModal>
                    <ModalContentInner>
                      {/* <Markdown
                            source={renderTemplateString(
                              content.downloaders_content[key]
                                .signature_instructions,
                              { SHA256, signature, hash, URL, version },
                            )}
                          /> */}
                    </ModalContentInner>
                  </ModalContent>
                </Modal>
              </DownloadBox>
            ),
          )}
        </Container>
      </>
      {/* )} */}
      {/* {loading && (
        <LoadingContainer>
          <div>
            <CircularProgress />
          </div>
        </LoadingContainer>
      )} */}
      {/* {hasError && (
        <ErrorContainer pl={12} pr={12}>
          <Typography variant="h1" color="error">
            <FaCogs />
          </Typography>
          <Typography variant="h3" color="error">
            {content.downloaders_content.no_releases_available}
          </Typography>
        </ErrorContainer>
      )} */}
    </Box>
  )
}

export default WalletDownloaders
