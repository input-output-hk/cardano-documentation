import React, { useRef } from 'react'
import { Box } from '@material-ui/core'
import styled from '@emotion/styled'
import { CopyInputContainer, CopyInput, Copy } from './SharedComponents'
import CopyIcon from '@site/src/components/icons/Copy.svg'

const CopyAddressContainer = styled(CopyInputContainer)`
  margin: 0.5rem 0 1.5rem 0 !important;
`
const CopyAddressInput = styled(CopyInput)`
  padding: 0.25rem 0.5rem !important;
  font-family: 'Chivo';
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  color: var(--ifm-font-color-base);
`

const CopyAddress = styled(Copy)`
  top: 0.2rem !important;
`

const FaucetAddresses = ({ preProduction, preview }) => {
  const preProdRef = useRef(null)
  const previewRef = useRef(null)
  const handleCopyToClipboard = (value, ref) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        if (ref.current) {
          ref.current.select()
        }
      })
      .catch((err) => {
        console.error('Failed to copy: ', err)
      })
  }
  return (
    <Box marginTop={0.5} gridRowGap={2}>
      <strong>Pre-production faucet address:</strong>
      <CopyAddressContainer>
        <CopyAddressInput ref={preProdRef} value={preProduction} readOnly />
        <CopyAddress
          onClick={() => handleCopyToClipboard(preProduction, preProdRef)}
        >
          <CopyIcon />
        </CopyAddress>
      </CopyAddressContainer>
      <strong>Preview faucet address:</strong>
      <CopyAddressContainer>
        <CopyAddressInput ref={previewRef} value={preview} readOnly />
        <CopyAddress onClick={() => handleCopyToClipboard(preview, previewRef)}>
          <CopyIcon />
        </CopyAddress>
      </CopyAddressContainer>
    </Box>
  )
}

export default FaucetAddresses
