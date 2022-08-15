import React, { useState, Fragment, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Markdown from '@input-output-hk/front-end-core-components/components/Markdown'
import Link from '@input-output-hk/front-end-core-components/components/Link'
import moment from 'moment'
import ReCaptcha from 'react-google-recaptcha'

import content from '../utils/testnetsContent'

const Container = styled(Box)`
  &.loading {
    form {
      opacity: 0.5;
    }
  }
`

const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
`

const DEFAULT_VALUES = {
  address: '',
  apiKey: '',
  reCaptcha: false,
}

const DEFAULT_ERRORS = {
  address: '',
  apiKey: '',
  reCaptcha: '',
}

const statuses = {
  ready: 'ready',
  loading: 'loading',
  success: 'success',
}

const FaucetInner = ({
  content,
  getEndpoint,
  hasApiKey,
  getTransactionURL,
  reCaptcha,
  getNativeAssetEndpoint,
}) => {
  const [values, setValues] = useState(DEFAULT_VALUES)
  const [errors, setErrors] = useState(DEFAULT_ERRORS)
  const [serverError, setServerError] = useState('')
  const [result, setResult] = useState(null)
  const [nativeToken, setNativeToken] = useState('Ada')
  const [status, setStatus] = useState(statuses.ready)
  const reCaptchaRef = useRef(null)
  let url

  const tokens = {
    '6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7': 'Testcoin',
  }

  const handleTokenSelectChange = event => {
    setNativeToken(event.target.value)
  }

  const valueOnChange = key => e => {
    if (key === 'reCaptcha') {
      setValues({ ...values, [key]: e })
    } else {
      setValues({ ...values, [key]: e.target.value })
    }

    setErrors({ ...errors, [key]: '' })
  }

  const getTransactionAmount = () => {
    if (result && result.unit && result.unit === 'lovelace') {
      if (
        result &&
        result.amount &&
        typeof result.amount === 'number' &&
        !isNaN(result.amount) &&
        result.amount > 0
      ) {
        return `${Math.round(result.amount / 1e6)} Ada`
      } else {
        return content.faucet_content.funds
      }
    } else {
      return `${
        result.amount === 'number' ? result.amount.toString() : result.amount
      } ${tokens[result.unit]}`
    }
  }

  const onSubmit = async e => {
    e.preventDefault()
    const newErrors = {}
    if (!values.reCaptcha)
      newErrors.reCaptcha = content.faucet_content.please_complete_recaptcha
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors(DEFAULT_ERRORS)
    setServerError('')
    setStatus(statuses.loading)
    try {
      const endpointParams = { address: values.address, apiKey: values.apiKey }
      if (reCaptcha) endpointParams.reCaptchaResponse = values.reCaptcha
      url =
        nativeToken === 'Ada'
          ? getEndpoint(endpointParams)
          : getNativeAssetEndpoint(endpointParams)
      const result = await fetch(url, { method: 'POST' })
      const jsonResult = await result.json()
      if (result.status === 200 && jsonResult.success === false) {
        if (jsonResult.txid === 'ERROR')
          setErrors({
            ...errors,
            address: content.faucet_content.invalid_address,
          })
        setServerError(
          jsonResult.message || content.faucet_content.server_error,
        )
        setStatus(statuses.ready)
      } else if (result.status === 200) {
        setResult({
          txid: jsonResult.txid,
          amount: jsonResult.amount,
          unit: jsonResult.unit,
        })
        setStatus(statuses.success)
      } else {
        switch (result.status) {
          case 404:
            setServerError(content.faucet_content.endpoint_not_found)
            setStatus(statuses.ready)
            return

          case 429:
            if (jsonResult.retryAfter) {
              setServerError(
                content.faucet_content.too_many_attempts_retry.replace(
                  /{{\stime\s}}/g,
                  moment(jsonResult.retryAfter).format('LLL'),
                ),
              )
            } else {
              setServerError(content.faucet_content.too_many_attempts)
            }
            setStatus(statuses.ready)
            return

          default:
            setServerError(
              jsonResult.message || content.faucet_content.server_error,
            )
            setStatus(statuses.ready)
            return
        }
      }
    } catch (error) {
      setServerError(content.faucet_content.server_error)
      setStatus(statuses.ready)
    }
  }

  const reset = e => {
    e.preventDefault()
    setStatus(statuses.ready)
    setResult(null)
  }

  useEffect(() => {
    if (reCaptchaRef.current && serverError) {
      reCaptchaRef.current.reset()
      setValues({ ...values, reCaptcha: null })
    }
  }, [reCaptchaRef, serverError])

  return (
    <Fragment>
      {[statuses.ready, statuses.loading].includes(status) && (
        <Container
          className={status === statuses.loading ? 'loading' : ''}
          maxWidth="40rem"
          marginTop={4}
          marginBottom={4}
          position="relative"
        >
          {status === statuses.loading && (
            <LoadingContainer>
              <CircularProgress />
            </LoadingContainer>
          )}
          <form onSubmit={onSubmit}>
            {serverError && (
              <Box marginBottom={2}>
                <Typography color="error">
                  <strong>{serverError}</strong>
                </Typography>
              </Box>
            )}

            <FormControl
              variant="outlined"
              fullWidth
              style={{ marginBottom: '2rem' }}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Choose
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={nativeToken}
                onChange={handleTokenSelectChange}
                label="Token Type"
              >
                <MenuItem value="Ada">tAda</MenuItem>
                <MenuItem value="Testcoin">Testcoin</MenuItem>
              </Select>
            </FormControl>

            <Box marginBottom={2}>
              <TextField
                value={values.address}
                required
                label="Address"
                error={Boolean(errors.address)}
                helperText={
                  errors.address || content.faucet_content.address_helper_text
                }
                fullWidth
                onChange={valueOnChange('address')}
                disabled={status === statuses.loading}
              />
            </Box>
            {hasApiKey && (
              <Box marginBottom={2}>
                <TextField
                  value={values.apiKey}
                  label="API Key"
                  error={Boolean(errors.apiKey)}
                  helperText={
                    errors.apiKey || content.faucet_content.api_key_helper_text
                  }
                  fullWidth
                  onChange={valueOnChange('apiKey')}
                  disabled={status === statuses.loading}
                />
              </Box>
            )}
            {reCaptcha && (
              <Box marginBottom={2}>
                {errors.reCaptcha && (
                  <Typography color="error">
                    <strong>{errors.reCaptcha}</strong>
                  </Typography>
                )}
                <ReCaptcha
                  sitekey={reCaptcha.sitekey}
                  onChange={valueOnChange('reCaptcha')}
                  ref={reCaptchaRef}
                />
              </Box>
            )}
            <Box display="flex" justifyContent="flex-end">
              <Button
                disabled={status === statuses.loading}
                type="submit"
                color="primary"
                variant="contained"
              >
                {content.faucet_content.request_funds}
              </Button>
            </Box>
          </form>
        </Container>
      )}
      {status === statuses.success && result && (
        <Box marginTop={4} marginBottom={4}>
          <h3>{content.faucet_content.success_heading}</h3>
          <Markdown
            source={content.faucet_content.transaction_successful
              .replace(/{{\samount\s}}/g, getTransactionAmount())
              .replace(/{{\saddress\s}}/, values.address)}
          />
          {result.txid && getTransactionURL && (
            <Fragment>
              <p>{content.faucet_content.verify_transaction_hash}</p>
              <p>
                <strong>
                  <Link href={getTransactionURL({ txid: result.txid })}>
                    {result.txid}
                  </Link>
                </strong>
              </p>
            </Fragment>
          )}
          {result.txid && !getTransactionURL && (
            <Fragment>
              <p>{content.faucet_content.verify_transaction_hash}</p>
              <p>
                <strong>{result.txid}</strong>
              </p>
            </Fragment>
          )}
          <Box marginTop={2}>
            <Button onClick={reset} variant="contained" color="primary">
              {content.faucet_content.request_more_funds}
            </Button>
          </Box>
        </Box>
      )}
    </Fragment>
  )
}

FaucetInner.propTypes = {
  content: PropTypes.object.isRequired,
  getEndpoint: PropTypes.func.isRequired,
  getNativeAssetEndpoint: PropTypes.func.isRequired,
  hasApiKey: PropTypes.bool.isRequired,
  getTransactionURL: PropTypes.func,
  reCaptcha: PropTypes.shape({
    version: PropTypes.number.isRequired,
    sitekey: PropTypes.string.isRequired,
  }),
}

const FaucetWrapper = ({
  getEndpoint,
  getNativeAssetEndpoint,
  hasApiKey,
  getTransactionURL,
  reCaptcha,
}) => (
  <FaucetInner
    content={content}
    getEndpoint={getEndpoint}
    hasApiKey={hasApiKey}
    getTransactionURL={getTransactionURL}
    reCaptcha={reCaptcha}
    getNativeAssetEndpoint={getNativeAssetEndpoint}
  />
)

// Trivial change to trigger deploy preview for test

const Faucet = () => (
  <FaucetWrapper
    getEndpoint={({ address, apiKey, reCaptchaResponse }) =>
      `https://ext.earthtools.ca/send-money?address=${address}&apiKey=${apiKey}&g-recaptcha-response=${reCaptchaResponse}`
    }
    hasApiKey
    getTransactionURL={({ txid }) =>
      `https://explorer.cardano-testnet.iohkdev.io/tx/${txid}`
    }
    reCaptcha={{
      version: 2,
      sitekey: '6LeAanQhAAAAALGaxGKy4aZUAydKOeK6KH1owhg6',
    }}
    getNativeAssetEndpoint={({ address, apiKey, reCaptchaResponse }) =>
      `https://ext.earthtools.ca/send-money/${address}?${
        apiKey
          ? `apiKey=${apiKey}`
          : `asset=${`6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7`}`
      }&g-recaptcha-response=${reCaptchaResponse}`
    }
  />
)

FaucetWrapper.propTypes = {
  getEndpoint: PropTypes.func.isRequired,
  getNativeAssetEndpoint: PropTypes.func.isRequired,
  hasApiKey: PropTypes.bool.isRequired,
  getTransactionURL: PropTypes.func,
  reCaptcha: PropTypes.shape({
    version: PropTypes.number.isRequired,
    sitekey: PropTypes.string.isRequired,
  }),
}

export default Faucet
