import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Location } from '@reach/router'
import styled, { keyframes } from 'styled-components'
import TinyColor from '@ctrl/tinycolor'
import Link from '@input-output-hk/front-end-core-components/components/Link'
import {
  MdClose,
  MdVisibility,
  MdVisibilityOff,
  MdRotateLeft,
  MdFileUpload,
} from 'react-icons/md'
import { FaTwitter, FaFacebookF, FaClipboard } from 'react-icons/fa'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import CircularProgress from '@material-ui/core/CircularProgress'

import testnetsTheme from '../../utils/testnetsTheme'
import content from '../../utils/testnetsContent'
import Delegator from './Delegator'
import Operator from './Operator'
import BTCSymbol from './BTCSymbol'
import CardanoLogo from './CardanoLogo'
import DelegatorIcon from './DelegatorIcon'
import OperatorIcon from './OperatorIcon'

const Container = styled.div`
  max-width: 80rem;
  margin: 4rem 0;
`

const Introduction = styled(Box)`
  p {
    margin: 0;
    font-size: 1.8rem;

    &:first-of-type {
      font-weight: 600;
      font-size: 2.2rem;
      margin-bottom: 0.6rem;
    }
  }
`

const ModalContent = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  height: 100vh;
  max-height: 25rem;
  width: 100vw;
  max-width: 30rem;
  transform: translate(-50%, -50%);
  padding: 6rem 2rem 2rem 2rem;
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

const ShareLinks = styled.div`
  display: flex;
  font-size: 2.2rem;

  > div {
    flex: 1;
    margin: 1rem;
  }

  span {
    font-size: 1.6rem;
    vertical-align: text-top;
  }
`

const TwitterLink = styled(Link)`
  color: #fff;
  background-color: #00acee;
  padding: 0.4rem 0.8rem 0;
  border-radius: 0.4rem;

  &:hover {
    color: #fff;
  }
`

const FacebookLink = styled(Link)`
  color: #fff;
  background-color: #3b5998;
  padding: 0.4rem 0.8rem 0;
  border-radius: 0.4rem;

  &:hover {
    color: #fff;
  }
`

const CopyToClipboardLink = styled(Link)`
  color: ${testnetsTheme.palette.primary.contrastText};
  padding: 0.4rem 0.8rem 0;
  border-radius: 0.4rem;
  font-size: 2.2rem;
  position: relative;

  &:hover {
    color: ${testnetsTheme.palette.primary.contrastText};
  }

  span.text {
    font-size: 1.6rem;
    vertical-align: text-top;
  }
`

const ghost = keyframes`
  from {
    transform: scale(1) translateY(-50%);
    opacity: 1;
  }

  to {
    transform: scale(2.6) translateY(-50%);
    opacity: 0;
  }
`

const AnimatedClipboard = styled.span`
  position: absolute;
  left: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  transform-origin: top;
  animation-name: ${ghost};
  animation-duration: 0.5s;
  animation-easing: ease-out;
  animation-iteration-count: 1;
`

const CalculatorPicker = styled.div`
  display: flex;

  > div {
    flex: 1;
    margin: 2rem;
    overflow: hidden;
    position: relative;

    button {
      border-radius: 0.4rem;
      padding: 3rem 1.5rem;
      height: 100%;

      &.MuiButton-contained {
        padding: 3.1rem 1.6rem;
      }

      > .MuiButton-label {
        font-weight: 900;
        display: flex;
        flex-direction: column;
        position: relative;
        z-index: 2;

        svg {
          height: 4rem;
          margin-bottom: 1rem;
        }
      }
    }

    > div {
      position: absolute;
      bottom: 0;

      svg {
        width: 13rem;
      }
    }

    &:first-of-type > div {
      left: 0;
      transform: translate(-45%, 45%);
    }

    &:last-of-type > div {
      right: 0;
      transform: translate(45%, 45%);
    }
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;

    > div {
      max-width: 25rem;
      width: 100%;
      margin: 2rem auto;
    }
  }
`

const Actions = styled.div`
  > div {
    display: flex;

    > div {
      flex: 1;
      margin: 1rem 2rem;
    }

    &:last-of-type {
      margin-bottom: 1rem;
    }
  }

  @media screen and (max-width: 600px) {
    > div {
      flex-direction: column;

      > div {
        max-width: 25rem;
        width: 100%;
        margin: 1rem auto;
      }
    }
  }
`

const HalfWidthGroup = styled.div`
  width: 100%;
  margin: 4rem 0;

  > div {
    display: inline-block;
    width: 50%;
    padding-left: 2rem;
    vertical-align: text-top;

    &:first-of-type {
      padding-right: 2rem;
      padding-left: 0;
    }
  }
`

const FullWidthGroup = styled.div`
  width: 100%;
  padding: 6rem 4rem;
`

const Inputs = styled.div``

const DEFAULT_VALUES = {
  ada: '10000',
  stakePoolControl: 1 / 500, // 1 / 250
  operatorsStake: '30000',
  stakePoolMargin: 0.025,
  stakePoolPerformance: 1,
  totalStakePools: 500,
  totalADA: 45e9,
  totalADAInCirculation: 32167734340,
  epochDurationInDays: 5,
  treasuryRate: 0.2,
  influenceFactor: 0.3,
  transactionFeesPerEpoch: '20000',
  currentEpoch: 1,
  expansionRate: 0.003,
}

function getDefaultValues(currency, initialValues) {
  return {
    ...DEFAULT_VALUES,
    ...initialValues,
    currency,
    stakePoolFixedFee:
      initialValues.stakePoolFixedFee !== undefined
        ? `${initialValues.stakePoolFixedFee}`
        : `${68 / parseFloat(currency.exchangeRate)}`,
  }
}

const Calculator = ({
  currencies,
  content,
  initialValues,
  initialCalculator,
  origin,
  pathname,
}) => {
  const [allCurrencies, setAllCurrencies] = useState(
    JSON.parse(JSON.stringify(currencies)),
  )
  const [values, setValues] = useState(
    getDefaultValues(allCurrencies[0], initialValues),
  )
  const [type, setType] = useState(initialCalculator)
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)
  const [shareModalVisible, setShareModalVisible] = useState(false)
  const [copied, setCopied] = useState(false)
  const containerRef = useRef(null)
  const copiedTimeout = useRef(null)
  const modalContent = useRef(null)

  function getInitialCurrency(key) {
    return currencies.filter(currency => currency.key === key).shift() || {}
  }

  function getTotalADAInCirculation(epoch, startingTotalADAInCirculation) {
    let i = 1
    let totalADAInCirculation =
      startingTotalADAInCirculation || values.totalADAInCirculation
    while (i < epoch) {
      const reserve = values.totalADA - totalADAInCirculation
      totalADAInCirculation += reserve * values.expansionRate
      i++
    }

    return totalADAInCirculation
  }

  function getEpochDistributableRewards(
    totalADAInCirculation,
    transactionFeesPerEpoch,
  ) {
    const reserve = values.totalADA - totalADAInCirculation
    return (
      (reserve * values.expansionRate + transactionFeesPerEpoch) *
      (1 - values.treasuryRate)
    )
  }

  function getDistributableRewards(epoch) {
    let transactionFeesPerEpoch = parseFloat(values.transactionFeesPerEpoch)
    if (
      !transactionFeesPerEpoch ||
      isNaN(transactionFeesPerEpoch) ||
      transactionFeesPerEpoch < 0
    )
      transactionFeesPerEpoch = 0

    const totalADAInCirculation = getTotalADAInCirculation(epoch)
    const epochDistribution = getEpochDistributableRewards(
      totalADAInCirculation,
      transactionFeesPerEpoch,
    )
    return epochDistribution
  }

  const setValue = (key, value) => {
    const newValues = { ...values, [key]: value }
    if (
      key === 'currency' &&
      value.exchangeRate !== values.currency.exchangeRate
    ) {
      const stakePoolFixedFeeInADA = toADA(parseFloat(values.stakePoolFixedFee))
      newValues.stakePoolFixedFee = `${fromADA(
        stakePoolFixedFeeInADA,
        value.exchangeRate,
      )}`
    }

    setValues(newValues)
  }

  const updateType = type => e => {
    e.preventDefault()
    setType(type)
  }

  const fromADA = (amount, exchangeRate = null) => {
    let exchangeRateUsed = parseFloat(
      exchangeRate === null ? values.currency.exchangeRate : exchangeRate,
    )
    if (isNaN(exchangeRateUsed) || exchangeRateUsed <= 0)
      exchangeRateUsed =
        getInitialCurrency(values.currency.key).exchangeRate || 1
    return amount * exchangeRateUsed
  }

  const toADA = (amount, exchangeRate = null) => {
    let exchangeRateUsed = parseFloat(
      exchangeRate === null ? values.currency.exchangeRate : exchangeRate,
    )
    if (isNaN(exchangeRateUsed) || exchangeRateUsed <= 0)
      exchangeRateUsed =
        getInitialCurrency(values.currency.key).exchangeRate || 1
    return amount / exchangeRateUsed
  }

  const toggleShowAdvancedOptions = e => {
    e.preventDefault()
    setShowAdvancedOptions(!showAdvancedOptions)
  }

  const reset = () => {
    const currency = currencies
      .filter(currency => currency.key === values.currency.key)
      .shift()
    setAllCurrencies(JSON.parse(JSON.stringify(currencies)))
    setValues(getDefaultValues(currency, initialValues))
  }

  const onReset = e => {
    e.preventDefault()
    reset()
  }

  const getCurrencySymbol = key =>
    (currencies.filter(currency => currency.key === key).shift() || {})
      .symbol || null
  const normalizeLargeNumber = (number, dp = 0, preserveDP = false) => {
    let negative = number < 0
    const normalizedNumber = Math.abs((number || 0).toFixed(dp))
    if (normalizedNumber === 0) negative = false
    const asStringArray = `${normalizedNumber}`.split('.')
    const n = asStringArray[0].split('').reverse()
    let i = 3
    while (i < n.length) {
      n.splice(i, 0, ',')
      i += 4
    }

    let finalNumber = n
      .reverse()
      .join('')
      .concat(asStringArray[1] ? `.${asStringArray[1]}` : '')
    if (!preserveDP && finalNumber.indexOf('.') > -1) {
      while (finalNumber[finalNumber.length - 1] === '0') {
        finalNumber = finalNumber.substring(0, finalNumber.length - 1)
      }
    }

    return `${negative ? '-' : ''}${finalNumber.replace(/\.$/, '')}`
  }

  const getShareableLink = () => {
    const params = new URLSearchParams()
    const keys = [
      'ada',
      'stakePoolControl',
      'operatorsStake',
      'stakePoolMargin',
      'stakePoolPerformance',
      'totalStakePools',
      'influenceFactor',
      'transactionFeesPerEpoch',
      'stakePoolFixedFee',
      'treasuryRate',
      'expansionRate',
      'epochDurationInDays',
      'currentEpoch',
    ]

    keys.forEach(key => params.set(key, values[key]))
    params.set('calculator', type)
    return `${origin}${pathname}?${params.toString()}`
  }

  const copyShareableLink = e => {
    e.preventDefault()
    const el = document.createElement('textarea')
    const link = getShareableLink()
    el.value = link
    el.setAttribute('readonly', 'true')
    el.setAttribute('aria-hidden', 'true')
    el.setAttribute('tab-index', '-1')
    el.style.position = 'absolute'
    el.style.left = '-999999px'
    modalContent.current.appendChild(el)
    el.select()
    document.execCommand('copy')
    modalContent.current.removeChild(el)
    clearTimeout(copiedTimeout.current)
    setCopied(true)
    copiedTimeout.current = setTimeout(() => setCopied(false), 500)
  }

  const CalculatorComponent = type === 'delegator' ? Delegator : Operator
  return (
    <Container ref={containerRef}>
      <Introduction paddingBottom={1} textAlign="center">
        <p>{content.staking_calculator.select_a_calculator}</p>
        <p>{content.staking_calculator.i_want_to}</p>
      </Introduction>
      <CalculatorPicker>
        <div>
          <Button
            variant={type === 'delegator' ? 'contained' : 'outlined'}
            onClick={updateType('delegator')}
            color="primary"
            fullWidth
          >
            <DelegatorIcon active={type === 'delegator'} />
            <span>{content.staking_calculator.delegate_my_stake}</span>
          </Button>
          <CardanoLogo active={type === 'delegator'} />
        </div>
        <div>
          <Button
            variant={type === 'operator' ? 'contained' : 'outlined'}
            onClick={updateType('operator')}
            color="primary"
            fullWidth
          >
            <OperatorIcon active={type === 'operator'} />
            <span>{content.staking_calculator.run_a_stake_pool}</span>
          </Button>
          <CardanoLogo active={type === 'operator'} />
        </div>
      </CalculatorPicker>
      <Actions>
        <div>
          <div>
            <Button
              color="primary"
              variant={showAdvancedOptions ? 'contained' : 'outlined'}
              onClick={toggleShowAdvancedOptions}
              fullWidth
            >
              {content.staking_calculator.show_advanced_options}
              <Box component="span" marginLeft={0.8}>
                {showAdvancedOptions ? <MdVisibilityOff /> : <MdVisibility />}
              </Box>
            </Button>
          </div>
          <div>
            <Button
              color="primary"
              variant="outlined"
              onClick={onReset}
              fullWidth
            >
              {content.staking_calculator.reset}
              <Box component="span" marginLeft={0.8}>
                <MdRotateLeft />
              </Box>
            </Button>
          </div>
        </div>
        <div>
          <div>
            <Button
              color="primary"
              variant="outlined"
              onClick={e => {
                e.preventDefault()
                setShareModalVisible(true)
              }}
              fullWidth
            >
              {content.staking_calculator.share}
              <Box component="span" marginLeft={0.8}>
                <MdFileUpload />
              </Box>
            </Button>
            {shareModalVisible && (
              <Modal
                open={shareModalVisible}
                onClose={e => {
                  e.preventDefault()
                  setShareModalVisible(false)
                }}
                disableScrollLock
              >
                <ModalContent ref={modalContent}>
                  <CloseModal
                    href="#"
                    onClick={e => {
                      e.preventDefault()
                      setShareModalVisible(false)
                    }}
                  >
                    <MdClose />
                  </CloseModal>
                  <ModalContentInner>
                    <Box textAlign="center">
                      <ShareLinks>
                        <div>
                          <TwitterLink
                            href={`https://twitter.com/intent/tweet?text=${getShareableLink()}`}
                          >
                            <FaTwitter />{' '}
                            <span>{content.staking_calculator.tweet}</span>
                          </TwitterLink>
                        </div>
                        <div>
                          <FacebookLink
                            href={`https://www.facebook.com/dialog/share?href=${getShareableLink()}&display=popup&app_id=282617186477949&redirect_uri=https://facebook.com/`}
                          >
                            <FaFacebookF />{' '}
                            <span>{content.staking_calculator.share}</span>
                          </FacebookLink>
                        </div>
                      </ShareLinks>
                      <p>
                        <CopyToClipboardLink
                          href="#copy-to-clipboard"
                          onClick={copyShareableLink}
                        >
                          <FaClipboard />{' '}
                          <span className="text">
                            {content.staking_calculator.copy_to_clipboard}
                          </span>
                          {copied && (
                            <AnimatedClipboard>
                              <FaClipboard />
                            </AnimatedClipboard>
                          )}
                        </CopyToClipboardLink>
                      </p>
                    </Box>
                  </ModalContentInner>
                </ModalContent>
              </Modal>
            )}
          </div>
          <div />
        </div>
      </Actions>
      <Inputs>
        <CalculatorComponent
          values={values}
          setValue={setValue}
          content={content}
          toADA={toADA}
          fromADA={fromADA}
          showAdvancedOptions={showAdvancedOptions}
          HalfWidthGroup={HalfWidthGroup}
          FullWidthGroup={FullWidthGroup}
          getCurrencySymbol={getCurrencySymbol}
          currencies={currencies}
          normalizeLargeNumber={normalizeLargeNumber}
          getDistributableRewards={getDistributableRewards}
          getTotalADAInCirculation={getTotalADAInCirculation}
          containerRef={containerRef}
        />
      </Inputs>
    </Container>
  )
}

Calculator.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.node.isRequired,
      key: PropTypes.string.isRequired,
      exchangeRate: PropTypes.string.isRequired,
    }),
  ),
  content: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
  initialCalculator: PropTypes.oneOf(['delegator', 'operator']),
  origin: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
}

export default () => {
  const [currencies, setCurrencies] = useState(null)

  const parseCurrencies = data => {
    const currencies = [
      { symbol: '₳', key: 'ADA', exchangeRate: '1' },
      { key: 'USD', symbol: '$' },
      { key: 'BTC', symbol: <BTCSymbol /> },
      { key: 'EUR', symbol: '€' },
      { key: 'GBP', symbol: '£' },
      { key: 'JPY', symbol: '¥' },
    ]

    const currentPrice = data.market_data.current_price
    return currencies
      .map(currency => ({
        exchangeRate: `${currentPrice[currency.key.toLowerCase()]}`,
        ...currency,
      }))
      .filter(({ exchangeRate }) => Boolean(exchangeRate))
  }

  const loadCardanoData = async () => {
    const storageKey = window.btoa(
      '___react-ada-staking-calculator___coingecko-result',
    )
    try {
      const cachedResult = window.localStorage.getItem(storageKey)
      if (cachedResult && cachedResult.expires > Date.now()) {
        setCurrencies(parseCurrencies(cachedResult.result))
      } else {
        const result = await fetch(
          'https://api.coingecko.com/api/v3/coins/cardano',
        )
        const jsonResult = await result.json()
        window.localStorage.setItem(
          storageKey,
          JSON.stringify({
            result: jsonResult,
            expires: Date.now() + 1000 * 60 * 60,
          }),
        )

        setCurrencies(parseCurrencies(jsonResult))
      }
    } catch (err) {
      console.error('Unable to fetch Cardano data', err)
      setCurrencies([{ symbol: 'ADA', key: 'ADA', exchangeRate: 1 }])
    }
  }

  useEffect(() => {
    loadCardanoData()
  }, [])

  function getInitialValues(search) {
    const params = new URLSearchParams(search)
    const initialValues = {}
    const keys = params.keys()
    for (const key of keys) {
      const value = params.get(key)
      if (key === 'ada') {
        if (!isNaN(parseFloat(value)) && parseFloat(value) >= 0)
          initialValues.ada = value
      } else if (key === 'stakePoolControl') {
        if (
          !isNaN(parseFloat(value)) &&
          parseFloat(value) >= 0 &&
          parseFloat(value) <= 0.02
        )
          initialValues.stakePoolControl = parseFloat(value)
      } else if (key === 'operatorsStake') {
        if (!isNaN(parseFloat(value)) && parseFloat(value) >= 0)
          initialValues.operatorsStake = parseFloat(value)
      } else if (key === 'stakePoolMargin') {
        if (
          !isNaN(parseFloat(value)) &&
          parseFloat(value) >= 0 &&
          parseFloat(value) <= 1
        )
          initialValues.stakePoolMargin = parseFloat(value)
      } else if (key === 'stakePoolPerformance') {
        if (
          !isNaN(parseFloat(value)) &&
          parseFloat(value) >= 0 &&
          parseFloat(value) <= 1
        )
          initialValues.stakePoolPerformance = parseFloat(value)
      } else if (key === 'totalStakePools') {
        if (
          !isNaN(parseInt(value)) &&
          parseInt(value) >= 100 &&
          parseInt(value) <= 1000
        )
          initialValues.totalStakePools = parseInt(value)
      } else if (key === 'influenceFactor') {
        if (
          !isNaN(parseFloat(value)) &&
          parseFloat(value) >= 0 &&
          parseFloat(value) <= 10
        )
          initialValues.influenceFactor = parseFloat(value)
      } else if (key === 'transactionFeesPerEpoch') {
        if (!isNaN(parseFloat(value)) && parseFloat(value) >= 0)
          initialValues.transactionFeesPerEpoch = value
      } else if (key === 'stakePoolFixedFee') {
        if (!isNaN(parseFloat(value)) && parseFloat(value) >= 0)
          initialValues.stakePoolFixedFee = parseFloat(value)
      } else if (key === 'treasuryRate') {
        if (
          !isNaN(parseFloat(value)) &&
          parseFloat(value) >= 0 &&
          parseFloat(value) <= 1
        )
          initialValues.treasuryRate = parseFloat(value)
      } else if (key === 'expansionRate') {
        if (
          !isNaN(parseFloat(value)) &&
          parseFloat(value) >= 0 &&
          parseFloat(value) <= 0.02
        )
          initialValues.expansionRate = parseFloat(value)
      } else if (key === 'epochDurationInDays') {
        if (
          !isNaN(parseFloat(value)) &&
          parseFloat(value) >= 1 &&
          parseFloat(value) <= 30
        )
          initialValues.epochDurationInDays = parseFloat(value)
      } else if (key === 'currentEpoch') {
        if (!isNaN(parseFloat(value)) && parseFloat(value) >= 1)
          initialValues.currentEpoch = parseFloat(value)
      }
    }

    return initialValues
  }

  function getInitialCalculator(search) {
    const params = new URLSearchParams(search)
    const initialCalculator = params.get('calculator')
    if (['delegator', 'operator'].includes(initialCalculator))
      return initialCalculator
    return 'delegator'
  }

  return (
    <Location>
      {({ location }) => (
        <Box position="relative">
          {currencies === null && (
            <Box textAlign="center" paddingTop={4} paddingBottom={4}>
              <CircularProgress />
            </Box>
          )}
          {currencies !== null && (
            <Calculator
              initialValues={getInitialValues(location.search)}
              initialCalculator={getInitialCalculator(location.search)}
              currencies={currencies}
              content={content}
              origin={location.origin}
              pathname={location.pathname}
            />
          )}
        </Box>
      )}
    </Location>
  )
}
