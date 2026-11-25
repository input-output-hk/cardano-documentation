import React, { useState, Fragment, useRef } from 'react'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Markdown from '@input-output-hk/front-end-core-components/components/Markdown'
import moment from 'moment'
import ReCaptcha from 'react-google-recaptcha'
import ChevronDown from './icons/ChevronDown.svg'

import content from './utils/testnetsContent'
import { ButtonBase, InputAdornment, TextField } from '@material-ui/core'
import BrowserOnly from '@docusaurus/BrowserOnly'

const DEFAULT_VALUES = {
  address: '',
  apiKey: '',
  reCaptcha: false,
  poolId: '',
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

const parseServerError = (error: string) => {
  switch (error) {
    case 'FaucetWebErrorInvalidApiKey':
      return 'Invalid API key'
    case 'FaucetWebErrorKeyCantDelegate':
      return "Key can't delegate"
    case 'FaucetWebErrorRateLimitExeeeded':
      return 'Rate limit exceeded, please try later'
    case 'FaucetWebErrorUtxoNotFound':
      return 'UTXO not found or The faucet is temporarily out of funds for this request — please report it to IOG.'
    case 'FaucetWebErrorStakeKeyNotFound':
      return 'Stake key not found'
    case 'FaucetWebErrorAlreadyDelegated':
      return 'Already delegated'
    default:
      return error.replace('FaucetWebError', '')
  }
}

const FaucetInner = ({
  content,
  getEndpoint,
  hasApiKey,
  reCaptcha,
  environments,
}) => {
  const [values, setValues] = useState(DEFAULT_VALUES)
  const [errors, setErrors] = useState(DEFAULT_ERRORS)
  const [serverError, setServerError] = useState('')
  const [result, setResult] = useState(null)
  const [environment, setEnvironment] = useState('preview')
  const [status, setStatus] = useState(statuses.ready)
  const [isPoolDelegation, setIsPoolDelegation] = useState(false)

  const reCaptchaRef = useRef(null)

  const resetCaptcha = () => {
    reCaptchaRef.current?.reset()
    setValues((currentValues) => ({ ...currentValues, reCaptcha: false }))
  }

  const valueOnChange = (key: string) => (e: { target: { value: any } }) => {
    if (key === 'reCaptcha') {
      // @ts-ignore
      setValues({ ...values, [key]: e })
    } else {
      setValues({ ...values, [key]: e.target.value })
    }

    setErrors({ ...errors, [key]: '' })
  }

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const newErrors = {}
    const apiKey = hasApiKey ? values.apiKey.trim() : ''
    if (reCaptcha && !apiKey && !values.reCaptcha)
      // @ts-ignore
      newErrors.reCaptcha = content.faucet_content.please_complete_recaptcha
    if (Object.keys(newErrors).length > 0) {
      // @ts-ignore
      setErrors(newErrors)
      return
    }
    setErrors(DEFAULT_ERRORS)
    setServerError('')
    setStatus(statuses.loading)
    try {
      const endpointParams = {
        environment: environment,
        address: values.address,
        apiKey,
        poolId: values.poolId,
        isPoolDelegation,
        reCaptchaResponse: reCaptcha ? values.reCaptcha : null,
      }

      const url = getEndpoint(endpointParams)
      const response = await fetch(url, { method: 'GET' })
      if (response.status === 404) {
        setServerError(content.faucet_content.endpoint_not_found)
        setStatus(statuses.ready)
        return
      }

      // Proxies may return HTML, plain text, or an empty body instead of JSON.
      const body = await response.json().catch(() => null)
      const jsonResult =
        body && typeof body === 'object' && !Array.isArray(body) ? body : null

      if (response.status === 429) {
        const retryHeader = response.headers.get('Retry-After')?.trim()
        const headerRetryTime = retryHeader
          ? /^\d+$/.test(retryHeader)
            ? Date.now() + Number(retryHeader) * 1000
            : Date.parse(retryHeader)
          : NaN
        const bodyRetryTime =
          typeof jsonResult?.retryAfter === 'number'
            ? jsonResult.retryAfter
            : typeof jsonResult?.retryAfter === 'string'
              ? Date.parse(jsonResult.retryAfter)
              : NaN
        const retryAt = moment(
          Number.isFinite(headerRetryTime) ? headerRetryTime : bodyRetryTime,
        )
        setServerError(
          retryAt.isValid()
            ? content.faucet_content.too_many_attempts_retry.replace(
                /{{\stime\s}}/g,
                retryAt.format('LLL'),
              )
            : content.faucet_content.too_many_attempts,
        )
        setStatus(statuses.ready)
        return
      }

      if (
        response.status !== 200 ||
        jsonResult?.error ||
        typeof jsonResult?.txid !== 'string' ||
        !jsonResult.txid.trim()
      ) {
        const errorTag = jsonResult?.error?.tag
        const message =
          typeof errorTag === 'string'
            ? parseServerError(errorTag)
            : typeof jsonResult?.message === 'string'
              ? jsonResult.message
              : ''
        setServerError(message || content.faucet_content.server_error)
        setStatus(statuses.ready)
        return
      }

      setResult({
        txid: jsonResult.txid,
        isPoolDelegation: endpointParams.isPoolDelegation,
        poolId: endpointParams.poolId,
        address: endpointParams.address,
      })
      setStatus(statuses.success)
    } catch (error) {
      setServerError(content.faucet_content.server_error)
      setStatus(statuses.ready)
    } finally {
      // A submitted token may have been consumed, even if the request failed.
      resetCaptcha()
    }
  }

  const reset = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    resetCaptcha()
    setStatus(statuses.ready)
    setResult(null)
  }

  return (
    <BrowserOnly>
      {() => {
        const isCorrectDomain = window.location.href.includes(
          'https://docs.cardano.org',
        )

        return isCorrectDomain ? (
          <Fragment>
            {[statuses.ready, statuses.loading].includes(status) && (
              <Box
                className={
                  status === statuses.loading
                    ? 'faucet-container-loading'
                    : 'faucet-container'
                }
                maxWidth="40rem"
                marginTop={4}
                marginBottom={4}
                position="relative"
              >
                {status === statuses.loading && (
                  <div className="loading-container">
                    <CircularProgress />
                  </div>
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
                    style={{
                      marginBottom: '1.5rem',
                    }}
                  >
                    <div className="faucet-text-field-wrapper">
                      <span>Environment</span>
                      <TextField
                        className="faucet-text-field"
                        select
                        value={environment}
                        disabled={status === statuses.loading}
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              style={{
                                position: 'absolute',
                                right: 0,
                                zIndex: -1,
                              }}
                            >
                              <ChevronDown />
                            </InputAdornment>
                          ),
                          disableUnderline: true,
                        }}
                        onChange={(
                          e: React.ChangeEvent<{
                            name?: string
                            value: string
                          }>,
                        ) => {
                          resetCaptcha()
                          setEnvironment(e.target.value)
                        }}
                      >
                        <option value="preview">Preview Testnet</option>
                        <option value="preprod">Preprod Testnet</option>
                      </TextField>
                      <span>Please select an environment</span>
                    </div>
                  </FormControl>

                  <FormControl
                    variant="outlined"
                    fullWidth
                    style={{
                      marginBottom: '1.5rem',
                    }}
                  >
                    <div className="faucet-text-field-wrapper">
                      <span>Action</span>
                      <TextField
                        className="faucet-text-field"
                        select
                        value={isPoolDelegation ? 'delegation' : 'testada'}
                        disabled={status === statuses.loading}
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              style={{
                                position: 'absolute',
                                right: 0,
                                zIndex: -1,
                              }}
                            >
                              <ChevronDown />
                            </InputAdornment>
                          ),
                          disableUnderline: true,
                        }}
                        onChange={(e) =>
                          setIsPoolDelegation(e.target.value === 'delegation')
                        }
                      >
                        <option value="testada">Receive test ADA</option>
                        <option value="delegation">
                          Receive pool delegation
                        </option>
                      </TextField>
                      <span>Please select an action</span>
                    </div>
                  </FormControl>

                  {isPoolDelegation && (
                    <Box marginBottom={3}>
                      <div className="faucet-text-field-wrapper">
                        <span>Pool ID</span>
                        <TextField
                          className="faucet-text-field"
                          value={values.poolId}
                          required
                          error={Boolean(errors.address)}
                          fullWidth
                          placeholder="Pool ID"
                          onChange={valueOnChange('poolId')}
                          disabled={status === statuses.loading}
                          InputProps={{
                            disableUnderline: true,
                          }}
                        />
                        <span>Please enter the Pool ID to delegate to</span>
                      </div>
                    </Box>
                  )}

                  {!isPoolDelegation && (
                    <Box marginBottom={3}>
                      <div className="faucet-text-field-wrapper">
                        <span>Address (required)</span>
                        <TextField
                          className="faucet-text-field"
                          value={values.address}
                          required
                          error={Boolean(errors.address)}
                          fullWidth
                          placeholder="Address"
                          onChange={valueOnChange('address')}
                          disabled={status === statuses.loading}
                          InputProps={{
                            disableUnderline: true,
                          }}
                        />
                        <span>Please enter the address to send funds to</span>
                      </div>
                    </Box>
                  )}

                  {hasApiKey && (
                    <Box className="faucet-api-box">
                      <div className="faucet-text-field-wrapper">
                        <span>API Key (optional)</span>
                        <TextField
                          className="faucet-text-field"
                          value={values.apiKey}
                          placeholder="API Key"
                          error={Boolean(errors.apiKey)}
                          fullWidth
                          onChange={valueOnChange('apiKey')}
                          disabled={status === statuses.loading}
                          InputProps={{
                            disableUnderline: true,
                          }}
                        />
                        <span>{content.faucet_content.api_key_helper_text}</span>
                      </div>
                    </Box>
                  )}

                  {reCaptcha &&
                    // @ts-ignore
                    Object.entries(environments).map(([env, { sitekey }]) =>
                      env === environment ? (
                        <Box marginBottom={4} key={env}>
                          {errors.reCaptcha && (
                            <Typography color="error">
                              <strong>{errors.reCaptcha}</strong>
                            </Typography>
                          )}
                          <ReCaptcha
                            sitekey={sitekey}
                            onChange={valueOnChange('reCaptcha')}
                            ref={reCaptchaRef}
                          />
                        </Box>
                      ) : null,
                    )}

                  <ButtonBase
                    style={{
                      fontFamily: 'Chivo',
                      fontSize: '0.8125rem',
                      lineHeight: '1.375rem',
                      fontWeight: '400',
                      width: 'fit-content',
                      padding: '0.5rem 1rem',
                      backgroundColor: 'var(--ifm-color-primary)',
                      color: '#fff',
                      borderRadius: '22.5rem',
                      transform: 'scale(1)',
                      transition: 'all 0.2s ease-in-out',
                      border: 'none',
                      margin: '2rem 0 !important',
                    }}
                    disabled={status === statuses.loading}
                    type="submit"
                    aria-disabled={status === statuses.loading}
                  >
                    {content.faucet_content.request_funds}
                  </ButtonBase>
                </form>
              </Box>
            )}
            {status === statuses.success && result && (
              <Box marginTop={4} marginBottom={4}>
                <h3>{content.faucet_content.success_heading}</h3>
                <Markdown
                  source={
                    result.isPoolDelegation
                      ? content.faucet_content.delegation_submitted.replace(
                          /{{\spoolId\s}}/,
                          () => result.poolId,
                        )
                      : content.faucet_content.transaction_submitted.replace(
                          /{{\saddress\s}}/,
                          () => result.address,
                        )
                  }
                />
                {result.txid && (
                  <Fragment>
                    <p>{content.faucet_content.verify_transaction_hash}</p>
                    <p>
                      <strong>{result.txid}</strong>
                    </p>
                  </Fragment>
                )}
                <Box marginTop={2}>
                  <Button onClick={reset} variant="contained" color="primary">
                    {content.faucet_content.request_again}
                  </Button>
                </Box>
              </Box>
            )}
          </Fragment>
        ) : (
          <p>
            The testnets faucet is only available on docs.cardano.org
            <br />
            <a
              href="https://docs.cardano.org/cardano-testnets/tools/faucet/"
              target="_blank"
            >
              Please click here to proceed.
            </a>
          </p>
        )
      }}
    </BrowserOnly>
  )
}

FaucetInner.propTypes = {
  content: PropTypes.object.isRequired,
  getEndpoint: PropTypes.func.isRequired,
  hasApiKey: PropTypes.bool.isRequired,
  reCaptcha: PropTypes.shape({
    version: PropTypes.number.isRequired,
  }),
}

const FaucetWrapper = ({ getEndpoint, hasApiKey, reCaptcha, environments }) => (
  <FaucetInner
    content={content}
    getEndpoint={getEndpoint}
    hasApiKey={hasApiKey}
    reCaptcha={reCaptcha}
    environments={environments}
  />
)

const Faucet = () => {
  const environments = {
    preview: {
      baseUrl: 'https://faucet.preview.play.dev.cardano.org',
      sitekey: '6LcU5S4uAAAAAIx0Za5hUkuGKoaT38zNkbO2PZ7z',
    },
    preprod: {
      baseUrl: 'https://faucet.preprod.play.dev.cardano.org',
      sitekey: '6Lcd5S4uAAAAAHBfcKiyoMRaaR1xroEhf0x8B8jk',
    },
  }

  return (
    <FaucetWrapper
      getEndpoint={({
        environment,
        address,
        apiKey,
        reCaptchaResponse,
        isPoolDelegation,
        poolId,
      }) => {
        const params = new URLSearchParams()
        params.set(
          isPoolDelegation ? 'poolid' : 'address',
          isPoolDelegation ? poolId : address,
        )
        if (apiKey) params.set('api_key', apiKey)
        if (typeof reCaptchaResponse === 'string' && reCaptchaResponse) {
          params.set('g-recaptcha-response', reCaptchaResponse)
        }
        const endpoint = isPoolDelegation ? 'delegate' : 'send-money'
        return `${environments[environment].baseUrl}/${endpoint}?${params.toString()}`
      }}
      hasApiKey
      reCaptcha={{
        version: 2,
      }}
      environments={environments}
    />
  )
}

FaucetWrapper.propTypes = {
  getEndpoint: PropTypes.func.isRequired,
  hasApiKey: PropTypes.bool.isRequired,
  reCaptcha: PropTypes.shape({
    version: PropTypes.number.isRequired,
  }),
}

export default Faucet
