import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { TinyColor } from '@ctrl/tinycolor'
import Link from '@input-output-hk/front-end-core-components/components/Link'
import { MdClose } from 'react-icons/md'
import { FaTwitter, FaFacebookF, FaClipboard } from 'react-icons/fa'
import Box from '@material-ui/core/Box'
import Modal from '@material-ui/core/Modal'
import CircularProgress from '@material-ui/core/CircularProgress'

import testnetsTheme from '../utils/testnetsTheme'
import content from '../utils/testnetsContent'
import Delegator from './Delegator'
import Operator from './Operator'
import BTCSymbol from './BTCSymbol'

import Reset from '../icons/Reset.svg'
import Share from '../icons/Share.svg'

import DelegateStakePool from '../icons/DelegateStakePool.svg'
import RunStakePool from '../icons/RunStakePool.svg'
import Selected from '../icons/RadioSelected.svg'
import Unselected from '../icons/RadioUnselected.svg'

const Container = styled.div`
  margin: 2rem 0;
  font-family: 'Chivo';
  font-size: 0.813rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.375rem;
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
`

const Heading = styled.div`
  border-bottom: 1px solid #505660;
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 1.25rem;
    font-weight: 400;
    line-height: normal !important;
    margin: 0 !important;

    @media (max-width: 767px) {
      font-size: 13px;
      line-height: 22px;
    }
  }

  div {
    display: flex;
    justify-content: row;
    gap: 0.5rem;
  }

  button {
    display: flex;
    padding: 0.5rem 1rem;
    justify-content: center;
    align-items: center;
    border-radius: 360px;
    background-color: transparent;
    color: var(--ifm-link-color);
    border: 1px solid var(--ifm-link-color);
    max-height: 2.375rem;

    svg {
      margin-left: 0.625rem;
    }
  }

  button:first-child {
    background: #1342b2;
    color: #fff;
    border: none;
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

const BasicOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2.5rem;

  p {
    margin-bottom: 0.5rem;
    text-align: center;
  }

  div {
    display: flex;
    width: 100%;
    gap: 1.5rem;
  }
`

const RadioButton = styled.button`
  font-family: 'Chivo';
  text-align: left;
  font-size: 0.813rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  display: flex;
  align-items: center;
  max-height: 65px;
  padding: 10px 16px 8px 16px;
  min-height: 4.063rem;

  border-radius: 4px;
  border: 1px solid #505660;

  background-color: #fff;
  color: #1c1e21;
  flex: 1 0 0;

  justify-content: space-between;

  div {
    display: flex;
    gap: 0.25rem;
    align-items: center;
  }

  span {
    margin-left: 0.25rem;
  }

  &[aria-selected='true'] {
    background-color: #1342b2;
    font-weight: 700;
    color: #fff;
  }

  @media (max-width: 767px) {
    line-height: 1rem;
  }
`

export const HalfAndHalfGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding-top: 1.5rem;
  gap: 1.5rem;

  div {
    flex-basis: 50%;
  }

  @media (max-width: 767px) {
    flex-direction: column;
  }
`

export const HalfWidthGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  padding-top: 1.5rem;

  > div {
    display: inline-block;
    width: 50%;
    vertical-align: text-top;
    gap: 0.25rem;
  }

  @media (max-width: 767px) {
    flex-direction: column;
    padding-top: 0;

    > div {
      width: 100%;
      vertical-align: text-top;
    }
  }

  &:first-of-type {
    padding-top: 2.5rem;
  }
`

export const FragmentedHalfWidthGroup = styled(HalfWidthGroup)`
  @media (max-width: 767px) {
    padding-top: 1.5rem;

    .empty-filler {
      display: none;
    }
  }
`

export const FullWidthGroup = styled.div`
  width: 100%;
`

export const AdvancedOptionsContainer = styled.div`
  margin: 2.5rem 0 0 0;

  button {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    color: var(--ifm-link-color);
    font-family: 'Chivo';
    font-weight: 400;
    font-size: 1rem;
    font-style: normal;
    line-height: 1.5rem;

    svg {
      margin-left: 1px;
      transform: rotate(0deg);
    }

    &[aria-expanded='true'] svg {
      transform: rotate(180deg);
    }
  }

  @media (max-width: 767px) {
    padding-bottom: 1.5rem;
  }
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
    return currencies.filter((currency) => currency.key === key).shift() || {}
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

    const totalADAInCirculation = getTotalADAInCirculation(epoch, undefined)
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

  const updateType = (type) => (e) => {
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

  const toggleShowAdvancedOptions = (e) => {
    e.preventDefault()
    setShowAdvancedOptions(!showAdvancedOptions)
    console.log(showAdvancedOptions)
  }

  const reset = () => {
    const currency = currencies
      .filter((currency) => currency.key === values.currency.key)
      .shift()
    setAllCurrencies(JSON.parse(JSON.stringify(currencies)))
    setValues(getDefaultValues(currency, initialValues))
  }

  const onReset = (e) => {
    e.preventDefault()
    reset()
  }

  const getCurrencySymbol = (key) =>
    (currencies.filter((currency) => currency.key === key).shift() || {})
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

    keys.forEach((key) => params.set(key, values[key]))
    params.set('calculator', type)
    return `${origin}${pathname}?${params.toString()}`
  }

  const copyShareableLink = (e) => {
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
      <Heading>
        <h3>{content.staking_calculator.select_a_calculator}</h3>
        <div>
          <button color="primary" onClick={onReset}>
            {content.staking_calculator.reset}
            <Reset />
          </button>
          <button
            color="primary"
            onClick={(e) => {
              e.preventDefault()
              setShareModalVisible(true)
            }}
          >
            {content.staking_calculator.share}
            <Share />
          </button>
          {shareModalVisible && (
            <Modal
              open={shareModalVisible}
              onClose={() => {
                setShareModalVisible(false)
              }}
              disableScrollLock
            >
              <ModalContent ref={modalContent}>
                <CloseModal
                  href="#"
                  onClick={(e) => {
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
      </Heading>
      <BasicOptionsContainer>
        <p>{content.staking_calculator.i_want_to}</p>
        <div>
          <RadioButton
            onClick={updateType('delegator')}
            aria-selected={type === 'delegator'}
          >
            <div>
              <DelegateStakePool />
              <span>{content.staking_calculator.delegate_my_stake}</span>
            </div>
            {type === 'delegator' ? <Selected /> : <Unselected />}
          </RadioButton>
          <RadioButton
            onClick={updateType('operator')}
            aria-selected={type === 'operator'}
          >
            <div>
              <RunStakePool />
              <span>{content.staking_calculator.run_a_stake_pool}</span>
            </div>
            {type === 'operator' ? <Selected /> : <Unselected />}
          </RadioButton>
        </div>
      </BasicOptionsContainer>
      <Inputs>
        <CalculatorComponent
          values={values}
          setValue={setValue}
          content={content}
          toADA={toADA}
          fromADA={fromADA}
          showAdvancedOptions={showAdvancedOptions}
          getCurrencySymbol={getCurrencySymbol}
          currencies={currencies}
          normalizeLargeNumber={normalizeLargeNumber}
          getDistributableRewards={getDistributableRewards}
          getTotalADAInCirculation={getTotalADAInCirculation}
          containerRef={containerRef}
          toggleShowAdvancedOptions={toggleShowAdvancedOptions}
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

  const parseCurrencies = (data) => {
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
      .map((currency) => ({
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
      const cachedResult = JSON.parse(window.localStorage.getItem(storageKey))
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
      setCurrencies([{ symbol: 'ADA', key: 'ADA', exchangeRate: '1' }])
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
          // @ts-ignore
          initialValues.ada = value
      } else if (key === 'stakePoolControl') {
        if (
          !isNaN(parseFloat(value)) &&
          parseFloat(value) >= 0 &&
          parseFloat(value) <= 0.02
        )
          // @ts-ignore
          initialValues.stakePoolControl = parseFloat(value)
      } else if (key === 'operatorsStake') {
        if (!isNaN(parseFloat(value)) && parseFloat(value) >= 0)
          // @ts-ignore
          initialValues.operatorsStake = parseFloat(value)
      } else if (key === 'stakePoolMargin') {
        if (
          !isNaN(parseFloat(value)) &&
          parseFloat(value) >= 0 &&
          parseFloat(value) <= 1
        )
          // @ts-ignore
          initialValues.stakePoolMargin = parseFloat(value)
      } else if (key === 'stakePoolPerformance') {
        if (
          !isNaN(parseFloat(value)) &&
          parseFloat(value) >= 0 &&
          parseFloat(value) <= 1
        )
          // @ts-ignore
          initialValues.stakePoolPerformance = parseFloat(value)
      } else if (key === 'totalStakePools') {
        if (
          !isNaN(parseInt(value)) &&
          parseInt(value) >= 100 &&
          parseInt(value) <= 1000
        )
          // @ts-ignore
          initialValues.totalStakePools = parseInt(value)
      } else if (key === 'influenceFactor') {
        if (
          !isNaN(parseFloat(value)) &&
          parseFloat(value) >= 0 &&
          parseFloat(value) <= 10
        )
          // @ts-ignore
          initialValues.influenceFactor = parseFloat(value)
      } else if (key === 'transactionFeesPerEpoch') {
        if (!isNaN(parseFloat(value)) && parseFloat(value) >= 0)
          // @ts-ignore
          initialValues.transactionFeesPerEpoch = value
      } else if (key === 'stakePoolFixedFee') {
        if (!isNaN(parseFloat(value)) && parseFloat(value) >= 0)
          // @ts-ignore
          initialValues.stakePoolFixedFee = parseFloat(value)
      } else if (key === 'treasuryRate') {
        if (
          !isNaN(parseFloat(value)) &&
          parseFloat(value) >= 0 &&
          parseFloat(value) <= 1
        )
          // @ts-ignore
          initialValues.treasuryRate = parseFloat(value)
      } else if (key === 'expansionRate') {
        if (
          !isNaN(parseFloat(value)) &&
          parseFloat(value) >= 0 &&
          parseFloat(value) <= 0.02
        )
          // @ts-ignore
          initialValues.expansionRate = parseFloat(value)
      } else if (key === 'epochDurationInDays') {
        if (
          !isNaN(parseFloat(value)) &&
          parseFloat(value) >= 1 &&
          parseFloat(value) <= 30
        )
          // @ts-ignore
          initialValues.epochDurationInDays = parseFloat(value)
      } else if (key === 'currentEpoch') {
        if (!isNaN(parseFloat(value)) && parseFloat(value) >= 1)
          // @ts-ignore
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
  )
}
