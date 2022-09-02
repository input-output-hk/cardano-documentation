import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import styled from 'styled-components'
import TinyColor from '@ctrl/tinycolor'
import Link from '@input-output-hk/front-end-core-components/components/Link'
import Markdown from '@input-output-hk/front-end-core-components/components/Markdown'
import { analytics } from '@input-output-hk/front-end-core-libraries'
import { FaDownload, FaCogs } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'

import testnetsTheme from '../utils/testnetsTheme'
import content from '../utils/testnetsContent'

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
  justify-content: center;
  flex-wrap: wrap;

  > div {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`

const ErrorContainer = styled(Box)`
  text-align: center;
`

const ChecksumArea = styled.textarea`
  border: 0.1rem solid
    ${new TinyColor(testnetsTheme.palette.text.primary)
      .setAlpha(0.2)
      .toString()};
  padding: 0.5rem;
  display: block;
  margin: 0 auto;
  resize: none;
  background-color: ${new TinyColor(testnetsTheme.palette.background.default)
    .lighten(5)
    .toString()};
  color: ${testnetsTheme.palette.text.primary};
  scrollbar-width: thin;
  cursor: pointer;

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
        'https://updates-cardano-preprod.s3.amazonaws.com/daedalus-latest-version.json',
      title: 'Pre-production Testnet',
    },
    preview: {
      endpoint:
        'https://updates-cardano-preview.s3.amazonaws.com/daedalus-latest-version.json',
      title: 'Preview Testnet',
    },
    testnet: {
      endpoint:
        'https://updates-cardano-testnet.s3.amazonaws.com/daedalus-latest-version.json',
      title: 'Legacy Testnet',
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

  const validateData = data => {
    if (!data.platforms) return false
    const validPlatforms = ['windows', 'darwin', 'linux']

    if (Object.keys(data.platforms).length !== validPlatforms.length)
      return false
    let valid = true

    validPlatforms.forEach(platform => {
      if (!data.platforms[platform]) {
        valid = false
      } else {
        const validKeys = ['signature', 'hash', 'URL', 'version', 'SHA256']

        if (Object.keys(data.platforms[platform]).length !== validKeys.length) {
          valid = false
        } else {
          validKeys.forEach(key => {
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
        Object.keys(jsonResult.platforms).map(platform => ({
          ...jsonResult.platforms[platform],
          key: platform,
        })),
      )
      setLoading(false)
    } catch (error) {
      console.error(error.message, error)
      analytics.exception({
        description: error.message,
        fatal: false,
        args: [envs[env].endpoint],
        error,
      })
      setHasError(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDaedalusData()
  }, [])

  const getOrderedPlatforms = order => {
    const platforms = []

    order.forEach(platform => {
      platforms.push(
        platformsData.filter(({ key }) => platform === key).shift(),
      )
    })

    return platforms.filter(platform => Boolean(platform))
  }

  const checksumOnClick = (SHA256, platform, version) => e => {
    e.preventDefault()
    analytics.click({
      category: gaCategory,
      label: `checksum_copy_${platform}_${version}`,
      event: e,
    })
    const el = checksumRefs[platform].current

    if (!el) return
    el.select()
    el.setSelectionRange(0, SHA256.length)
    document.execCommand('copy')
  }

  const openModal = name => e => {
    e.preventDefault()
    setActiveModal(name)
  }

  const getFilename = URL => URL.replace(/^.*\/(.*?)$/, '$1')

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

  const getPGPFilename = URL => `${getFilename(URL)}.asc`

  const getPGPBlob = signature =>
    window.Blob && new window.Blob([signature], { type: 'text/txt' })

  const getPGPSignatureHref = signature => {
    const blob = getPGPBlob(signature)

    return blob ? URL.createObjectURL(blob) : '#'
  }

  const onDownloadPGPSignature = (signature, URL) => e => {
    if (window.navigator.msSaveBlob || e.target.href === '#') e.preventDefault()
    if (window.navigator.msSaveBlob)
      window.navigator.msSaveBlob(getPGPBlob(signature), getPGPFilename(URL))
  }

  const unCacheURL = url => {
    return url + '?t=' + new Date().getTime()
  }

  return (
    <Box marginTop={4} marginBottom={4}>
      {!hasError && !loading && platformsData && (
        <>
          <h3>{envs[env].title}</h3>
          <Container>
            {getOrderedPlatforms(
              content.downloaders_content.platforms_order.map(
                platform => platform.platform_name,
              ),
            ).map(({ key, signature, hash, URL, version, SHA256 }) => (
              <Box
                flex={1}
                key={key}
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                textAlign="center"
              >
                <span>
                  <strong>{content.downloaders_content[key].full_label}</strong>
                </span>
                <span>
                  {content.downloaders_content.version}: {version}
                </span>
                <Box marginTop={1} marginBottom={1}>
                  <Button
                    component={Link}
                    href={unCacheURL(URL)}
                    variant="contained"
                    tracking={{
                      category: gaCategory,
                      label: `download_${key}_${version}`,
                    }}
                  >
                    {content.downloaders_content[key].short_label}
                    <Box component="span" marginLeft={1}>
                      <FaDownload />
                    </Box>
                  </Button>
                </Box>
                <Box>
                  <span>{content.downloaders_content.sha_checksum}</span>
                  <ChecksumArea
                    ref={checksumRefs[key]}
                    title={content.downloaders_content.copy_to_clipboard}
                    onClick={checksumOnClick(SHA256, key, version)}
                    aria-label={content.downloaders_content.copy_to_clipboard}
                    value={SHA256}
                    readOnly
                    rows={3}
                  />
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
                    <ModalContent>
                      <CloseModal href="#" onClick={openModal('')}>
                        <MdClose />
                      </CloseModal>
                      <ModalContentInner>
                        <Markdown
                          source={renderTemplateString(
                            content.downloaders_content[key]
                              .checksum_instructions,
                            { SHA256, signature, hash, URL, version },
                          )}
                        />
                      </ModalContentInner>
                    </ModalContent>
                  </Modal>
                </Box>
                <Box marginTop={1}>
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
                    <Box marginLeft={1} component="span">
                      <FaDownload />
                    </Box>
                  </Link>
                  <Box>
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
                      <ModalContent>
                        <CloseModal href="#" onClick={openModal('')}>
                          <MdClose />
                        </CloseModal>
                        <ModalContentInner>
                          <Markdown
                            source={renderTemplateString(
                              content.downloaders_content[key]
                                .signature_instructions,
                              { SHA256, signature, hash, URL, version },
                            )}
                          />
                        </ModalContentInner>
                      </ModalContent>
                    </Modal>
                  </Box>
                </Box>
              </Box>
            ))}
          </Container>
        </>
      )}
      {loading && (
        <LoadingContainer>
          <div>
            <CircularProgress />
          </div>
        </LoadingContainer>
      )}
      {hasError && (
        <ErrorContainer pl={12} pr={12}>
          <Typography variant="h1" color="error">
            <FaCogs />
          </Typography>
          <Typography variant="h3" color="error">
            {content.downloaders_content.no_releases_available}
          </Typography>
        </ErrorContainer>
      )}
    </Box>
  )
}

export default WalletDownloaders
