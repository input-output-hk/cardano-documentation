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

  // TODO: Get the relevenat content from this testnets carryover dynamically from markdown
  const content = {
    main_title: 'Cardano Testnets',
    main_title_aria_label: 'Cardano Testnets Home',
    select_language: 'Select language',
    select_theme: 'Select theme',
    last_updated: 'Last updated',
    report_an_issue: 'Report a documentation issue',
    search: 'Search',
    previous: 'Previous',
    next: 'Next',
    search_form_aria_label: 'Search Cardano Testnets',
    search_form_submit_aria_label: 'Perform search',
    open_search_bar: 'Open search bar',
    close_search_bar: 'Close search bar',
    main_navigation_label: 'Main',
    close_main_navigation: 'Close main navigation menu',
    open_main_navigation: 'Open main navigation menu',
    logo_alt: 'Cardano Testnets Logo',
    staking_calculator: {
      saturation: 'Pool saturation',
      select_a_calculator: 'Select a calculator',
      i_want_to: 'I want to',
      delegate_my_stake: 'Delegate my stake',
      run_a_stake_pool: 'Run a stake pool',
      show_advanced_options: 'Advanced options',
      treasury_rate_label: 'Treasury rate',
      treasury_rate_descriptor:
        '% of gross rewards distributed to the treasury',
      expansion_rate_label: 'Expansion rate',
      expansion_rate_descriptor: '% of reserves released per epoch',
      reset: 'Reset',
      share: 'Share',
      tweet: 'Tweet',
      copy_to_clipboard: 'Copy to clipboard',
      ada_label: 'Ada amount',
      ada_descriptor: 'Set the amount of ada you want to delegate',
      ada_label_operator: 'Pledge amount',
      ada_descriptor_operator:
        'Set the amount of ada you want to pledge to your pool',
      currency_label: 'Currency',
      currency_descriptor:
        'Please select the currency you wish to see results in',
      exchange_rate_label: 'Exchange rate',
      exchange_rate_descriptor:
        'Set the value of a single ada in {{ currency }}, defaults to [CoinGecko market rate](https://www.coingecko.com/en/coins/cardano)\n',
      fixed_fee_label: 'Stake pool daily fixed fee',
      fixed_fee_descriptor_ada:
        'Set the fixed fee covering daily stake pool running costs\n',
      fixed_fee_descriptor:
        'Set the fixed fee covering daily stake pool running costs, in ADA ({{amount}} ADA)\n',
      stake_pool_control_label: 'Stake pool total stake',
      stake_pool_control_descriptor:
        'Set the amount of stake the pool controls, as a percentage of the total available stake',
      total_stake_pools_label: 'Total stake pools',
      participation_rate_label: 'Delegation participation rate',
      participation_rate_descriptor:
        'Set the total amount of stake delegated across the network in this epoch, as a percentage of the total available stake',
      operators_stake_label: "Stake pool operator's stake",
      operators_stake_descriptor:
        "Set the size of the stake pool operator's stake",
      stake_pool_margin_label: 'Stake pool operator reward percentage',
      stake_pool_margin_descriptor:
        'Set the amount of rewards taken by the stake pool operator, as a percentage of the total rewards earned by the pool',
      stake_pool_performance_label: 'Stake pool performance',
      stake_pool_performance_descriptor:
        'How efficient is the stake pool, influences the stake pools penalty on the gross rewards. Any penalties go to the treasury',
      delegation_rewards: 'Delegation rewards',
      yield: 'Yield',
      yearly: 'Yearly',
      private_stake_pool_label: 'Private stake pool',
      private_stake_pool_descriptor:
        'Is the stake pool open to third party staking',
      running_costs: 'Running costs',
      stake_pool_operation_rewards: 'Stake pool operation rewards',
      combined_rewards: 'Combined rewards',
      transaction_fees_per_epoch_label: 'Average transaction fees per epoch',
      transaction_fees_per_epoch_descriptor:
        'The average amount of transaction fees per epoch are added to the net distribution of rewards and used to calculate the distribution rate from the reserves',
      influence_factor_label: 'Influence factor (a0)',
      influence_factor_descriptor:
        'System parameter used to control the ADA distribution rate',
    },
    kevm_description:
      'The KEVM is a high quality, formally verified smart contract virtual machine compatible with the Ethereum virtual machine (EVM). Formally specified in the K framework, the KEVM uses formal semantics for elements such as the configuration and transition rules of EVM, resulting in a more secure virtual machine for smart contracts.\n',
    iele_description:
      'The IELE testnet underpins the path to a more secure, robust smart contract design for Cardano. It is a new register-based virtual machine for smart contracts built to take account of the lessons learned from LLVM. IELE aims to provide the most secure and high-performance platform for running smart contracts, while also delivering the most flexible set of interfaces possible to execute different programming languages.\n',
    faucet_content: {
      funds: 'funds',
      invalid_address: 'Invalid address',
      server_error: 'Server error',
      endpoint_not_found: 'Server endpoint not found',
      too_many_attempts: 'Too many requests',
      too_many_attempts_retry: 'Too many requests, retry after {{ time }}',
      address_helper_text: 'The address to send funds to',
      api_key_helper_text: 'Optional API key to bypass rate limiting',
      request_funds: 'Request funds',
      request_more_funds: 'Request more funds',
      success_heading: 'Success',
      verify_transaction_hash: 'Please verify the following transaction hash:',
      transaction_successful:
        'Your transaction has been successful and __{{ amount }}__ have been sent to __{{ address }}__.',
      please_complete_recaptcha: 'Please complete the ReCAPTCHA',
    },
    downloaders_content: {
      version: 'Version',
      error_fetching_data: 'Error fetching data',
      no_releases_available:
        'No releases are currently available right now, please check back later.',
      platforms_order: [
        {
          platform_name: 'darwin',
        },
        {
          platform_name: 'linux',
        },
        {
          platform_name: 'windows',
        },
      ],
      sha_checksum: 'SHA256 checksum',
      verify_signature: 'Verify signature',
      pgp_signature: 'PGP signature',
      verify_checksum: 'Verify checksum',
      copy_to_clipboard: 'Copy to clipboard',
      windows: {
        short_label: 'Windows',
        full_label: 'Windows 8.1 and 10, 64 bit',
        checksum_instructions:
          '## Windows checksum verification instructions\n\n### Installer integrity\n\nSHA256 checksum can be verified using the following command:\n\n```shell\ncertutil -hashfile C:\\Users\\YOUR_USERNAME\\Downloads\\{{ filename }} SHA256\n```\n\nInstead of typing the path to the Daedalus installer executable use drag and drop:\n\n1. Press Windows Start Menu\n1. Type cmd\n1. You should see cmd.exe in the list of results. Click on cmd.exe to launch it.\n1. Type or paste: certutil -hashfile\n1. Press space\n1. Drag and drop Daedalus installer from Explorer to Command Prompt\n1. Press space\n1. Type or paste: SHA256\n1. Press enter key\n\nYou should see the following output, where string on the second line is the SHA256 checksum:\n\n```shell\nSHA256 hash of file C:\\Users\\YOUR_USERNAME\\Downloads\\{{ filename }}:\n\n{{ sha256 }}\n\nCertUtil: -hashfile command completed successfully.\n```\n',
        signature_instructions:
          "## Windows PGP signature verification instructions\n\n1. Obtain both the Daedalus installer .exe file, and its corresponding .exe.asc signature file -- put them in the same directory.\n1. Obtain the GNUPG package from [https://www.gpg4win.org/](https://www.gpg4win.org/)\n1. Proceed with installation and launch the Kleopatra component.\n1. Unless you already have a personal GPG key, you will have to create one (which is required for step 6):\n  - Select the menu item File -> New keypair -> Create a personal OpenPGP key pair.\n  - Enter a name and an email address that suit you personally.\n  - Choose a passphrase to protect your personal key (NOTE: the passphrase can be empty, but it is not recommended if you intend to use GNUPG in future).\n1. Import the IOHK key:\n  - File -> Lookup on Server\n  - Allow network access to 'dirmngr', if the prompt arises\n  - Search for signing.authority@iohk.io\n  - Import the key\n  - Do not certify the key just yet\n  - Right-click on the key, and choose \"Details\"\n  - Ensure that the fingerprint is D32587D4090FE461CAEE0FF4966E5CB9CBFAA9BA\n  - If it's not, the wrong key was imported, right click and delete\n  - If it is, we are good to go\n1. Certify the IOHK key (this designates trust and is required for the next step):\n  - Once you have a personal GPG key, right-click on the imported IOHK key and choose Certify\n  - Enable the IOHK user ID\n  - Tick the I have verified the fingerprint checkbox (since you did, as per step 5), and proceed.\n  - You should receive a message saying Certification successful\n1. Verify the installer binary:\n  - Click the Decrypt/Verify button on the Kleopatra toolbar\n  - Choose the Daedalus installer .exe file in the file dialog (the .asc signature file must reside in the same directory)\n1. If the verification is successful, you will receive a green-tinted message box saying:\n  - Valid signature by signing.authority@iohk.io\n  - Date of signature\n  - With certificate D325 87D4 090F E461 CAEE 0FF4 966E 5CB9 CBFA A9BA\n  - Anything else would constitute a signature verification failure.\n",
      },
      darwin: {
        short_label: 'Mac OS',
        full_label: 'Mac OS 64 bit',
        checksum_instructions:
          '## MacOS checksum verification instructions\n\n### Installer integrity\n\nSHA256 checksum can be verified using the following command:\n\n```shell\nshasum -a 256 ~/Downloads/{{ filename }}\n```\n\nInstead of typing the path to the Daedalus installer executable use drag and drop:\n\n1. Open Terminal\n1. Type or paste: `shasum -a 256`\n1. Press space key\n1. Drag and drop Daedalus installer from Finder to Terminal\n1. Press enter key\n\nYou should see the following output, where string before the file path is the SHA256 checksum:\n\n```shell\n{{ sha256 }} ~/Downloads/{{ filename }}\n```\n',
        signature_instructions:
          "## MacOS PGP signature verification instructions\n\n1. Obtain both the Daedalus installer .pkg file, and its corresponding .pkg.asc signature file -- put them in the same directory.\n1. If you already have the GPG Suite installed, and a personal key generated, please skip to step 5, and if not, proceed with the next step.\n1. Go to [https://gpgtools.org](https://gpgtools.org), head to the GPG Suite section, download the .dmg file and install it:\n  * Right-click the .dmg file, then Open, which will open a new window with two icons: Install and Uninstall\n  * Right-click the Install icon, and choose Open with.. -> Installer, which should start the GPG Suite installer\n  * Follow through the installation wizard\n1. Once GPG Suite installation completes, it will ask you to create a new key pair (this is required for step 6, so please don’t skip it):\n  * Enter a name and an email that suit you personally.\n  * Choose a passphrase to protect your personal key (NOTE: the passphrase can be empty, but it is not recommended if you intend to use this key and GPG Suite in future).\n1. Import the IOHK key using the GPG Keychain application:\n  * Select Key -> Lookup Key on Key Server in the application menu\n  * Search for signing.authority@iohk.io\n  * Choose the key with fingerprint CBFAA9BA with the user ID “IOHK Signing Authority ”, then click Retrieve Key\n  * Verify (right-click the imported key, then Details) that the fingerprint of the imported key is D325 87D4 090F E461 CAEE 0FF4 966E 5CB9 CBFA A9BA\n  * If it's not, the wrong key was imported, right click and delete\n  * If it is, we are good to proceed with the next step.\n1. Sign the imported IOHK key (this designates trust and is required for the next step):\n  * Right-click on the imported IOHK key, then “Sign”.\n1. Verify the installer binary:\n  * Right-click the Daedalus installer (.pkg file) in Finder (do NOT right click on the .asc file, that will not work), then select Services -> OpenPGP: Verify Signature of File (the .asc signature file must reside in the same directory)\n  * The Verification Results dialog will then appear with the verdict in the Result column:\n    1. “Signed by: IOHK Signing Authority 1471941A -- full trust” -- if successful\n    1. ..anything else means there was no valid signature for the installer.\n",
      },
      linux: {
        short_label: 'Linux',
        full_label: 'Linux 64 bit',
        checksum_instructions:
          '## Linux checksum verification instructions\n\n### Installer integrity\n\nVerify the sha256 hash:\n\n```shell\nsha256sum ~/Downloads/{{ filename }}\n```\n\nExpected:\n\n```shell\n{{ sha256 }}\n```\n',
        signature_instructions:
          '## Linux PGP signature verification instructions\n\n- Obtain both the Daedalus installer .bin file, and its corresponding .bin.asc signature file -- put them in the same directory.\n- Ensure that the gpg2 command is available (assuming Ubuntu Linux) in your shell, and if not -- execute the following shell command (shell commands further indicated by this bold monospace font):\n  - `apt-get install gnupg2`\n- Unless you already have a personal GPG key, create one (this is required for step 5):\n  - `gpg2 --generate-key`\n  - Supply an user ID (real name and email) that suit you personally\n  - Choose a passphrase to protect your personal key (NOTE: the passphrase can be empty, but it is not recommended if you intend to use this key and GNUPG in future)\n- Import the IOHK key:\n  - `gpg2 --keyserver hkp://keys.openpgp.org --search-keys signing.authority@iohk.io`\n  - In the selection dialogue, choose the key with fingerprint 966E5CB9CBFAA9BA\n- Sign the IOHK key (this designates trust and is required for the next step):\n  - `gpg2 --lsign D32587D4090FE461CAEE0FF4966E5CB9CBFAA9BA`\n- Verify the installer binary using the .asc signature (the .asc signature file must reside in the same directory as the installer binary):\n  - `gpg2 --verify {{ filename }}.asc`\n  - Successful verification should produce a message like follows:\n\n```shell\ngpg: assuming signed data in {{ filename }}.pkggpg: Signature made ...DATE...gpg: using RSA key 9F9840B50AE539A2732CF646C131557F1471941Agpg: checking the trustdbgpg: marginals needed: 3 completes needed: 1 trust model: pgpgpg: depth: 0 valid: 1 signed: 1 trust: 0-, 0q, 0n, 0m, 0f, 1ugpg: depth: 1 valid: 1 signed: 0 trust: 1-, 0q, 0n, 0m, 0f, 0ugpg: next trustdb check due at ...DATE...gpg: Good signature from IOHK Signing Authority <signing.authority@iohk.io>\n```\n',
      },
    },
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
