import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Markdown from '@input-output-hk/front-end-core-components/components/Markdown'
import ADAAmount from './inputs/ADAAmount'
import SelectCurrency from './inputs/SelectCurrency'
import ExchangeRate from './inputs/ExchangeRate'
import StakePoolFixedFee from './inputs/StakePoolFixedFee'
import StakePoolControl from './inputs/StakePoolControl'
import TotalStakePools from './inputs/TotalStakePools'
import StakePoolMargin from './inputs/StakePoolMargin'
import StakePoolPerformance from './inputs/StakePoolPerformance'
import TransactionFeesPerEpoch from './inputs/TransactionFeesPerEpoch'
import PrivateStakePoolSwitch from './inputs/PrivateStakePoolSwitch'
import InfluenceFactor from './inputs/InfluenceFactor'
import TreasuryRate from './inputs/TreasuryRate'
import ExpansionRate from './inputs/ExpansionRate'
import Rewards from './Rewards'

const Operator = ({
  values,
  setValue,
  content,
  toADA,
  fromADA,
  showAdvancedOptions,
  HalfWidthGroup,
  FullWidthGroup,
  getCurrencySymbol,
  normalizeLargeNumber,
  currencies,
  getDistributableRewards,
  getTotalADAInCirculation,
  containerRef
}) => {
  const [ privateStakePool, setPrivateStakePool ] = useState(false)
  const [ rewards, setRewards ] = useState({
    graphData: [],
    breakdown: [
      {
        daily: { ada: normalizeLargeNumber(0, 6), currency: normalizeLargeNumber(0, 6), yield: normalizeLargeNumber(0, 2) },
        epoch: { ada: normalizeLargeNumber(0, 6), currency: normalizeLargeNumber(0, 6), yield: normalizeLargeNumber(0, 2) },
        yearly: { ada: normalizeLargeNumber(0, 6), currency: normalizeLargeNumber(0, 6), yield: normalizeLargeNumber(0, 2) }
      }
    ]
  })

  function getEpochReward (epoch, operatorsStake, stakePoolFixedFee) {
    const totalADAInCirculation = getTotalADAInCirculation(epoch)
    const stakePoolMargin = privateStakePool ? 0 : values.stakePoolMargin
    const epochDistribution = getDistributableRewards(epoch)
    const poolSaturation = totalADAInCirculation / values.totalStakePools
    const operatorsPledge = Math.min(poolSaturation, operatorsStake)
    const operatorsPledgePercentage = operatorsPledge / totalADAInCirculation
    const control = privateStakePool
      ? operatorsStake / values.totalADAInCirculation
      : values.stakePoolControl

    const z0 = 1 / values.totalStakePools
    const sigmaPrime = Math.min(z0, control)

    let grossPoolReward = epochDistribution / (1 + values.influenceFactor) * (sigmaPrime + values.influenceFactor * operatorsPledgePercentage * (((sigmaPrime - operatorsPledgePercentage) * ((z0 - sigmaPrime) / z0)) / z0))

    const penalty = (1 - values.stakePoolPerformance) * grossPoolReward
    grossPoolReward = Math.max(0, grossPoolReward - penalty)
    grossPoolReward = Math.max(0, grossPoolReward - values.epochDurationInDays * stakePoolFixedFee)
    const margin = grossPoolReward * stakePoolMargin
    const netReward = grossPoolReward - margin
    const adaInPool = Math.min(control * values.totalADAInCirculation, poolSaturation)
    const operatorsReward = netReward * (operatorsPledge / adaInPool)
    return {
      operatorsStake: operatorsStake + operatorsReward + margin,
      operatorsReward: operatorsReward,
      operatorsMargin: margin,
      reward: margin + operatorsReward
    }
  }

  function getRewards (initialOperatorsStake, stakePoolFixedFee) {
    const rewards = []
    const n = Math.floor(365 / values.epochDurationInDays)
    while (rewards.length < n) {
      rewards.push(getEpochReward(
        values.currentEpoch + rewards.length,
        (rewards[rewards.length - 1] || {}).operatorsStake || initialOperatorsStake,
        stakePoolFixedFee
      ))
    }

    return rewards
  }

  useEffect(() => {
    let stakePoolFixedFee = toADA(parseFloat(values.stakePoolFixedFee))
    let ada = parseFloat(values.ada)
    if (isNaN(stakePoolFixedFee)) stakePoolFixedFee = 0
    if (isNaN(ada)) ada = 0
    const rewards = getRewards(ada, stakePoolFixedFee)

    const epochReward = rewards[0].operatorsReward
    const dailyReward = epochReward / values.epochDurationInDays
    const yearlyReward = rewards.reduce((a, b) => a + b.operatorsReward, 0)

    const dailyRunningCosts = stakePoolFixedFee
    const epochRunningCosts = stakePoolFixedFee * values.epochDurationInDays
    const yearlyRunningCosts = stakePoolFixedFee * 365

    const epochMargin = rewards[0].operatorsMargin
    const dailyMargin = epochMargin / values.epochDurationInDays
    const yearlyMargin = rewards.reduce((a, b) => a + b.operatorsMargin, 0)

    const getPercentage = (n) => {
      if (n === Infinity) return 'N/A'
      return `${normalizeLargeNumber(n, 4, true)}%`
    }

    setRewards({
      graphData: [
        { x: 0, y: fromADA(ada), reward: 0 },
        ...rewards.map((reward, index) => ({
          x: index + 1,
          y: fromADA(reward.operatorsStake),
          reward: fromADA(reward.reward)
        }))
      ],
      breakdown: [
        // Running costs
        {
          type: 'running_costs',
          daily: {
            ada: normalizeLargeNumber(dailyRunningCosts, 6, true),
            currency: normalizeLargeNumber(fromADA(dailyRunningCosts), 6, true),
            yield: getPercentage(dailyRunningCosts / ada * 100)
          },
          epoch: {
            ada: normalizeLargeNumber(epochRunningCosts, 6, true),
            currency: normalizeLargeNumber(fromADA(epochRunningCosts), 6, true),
            yield: getPercentage(epochRunningCosts / ada * 100)
          },
          yearly: {
            ada: normalizeLargeNumber(yearlyRunningCosts, 6, true),
            currency: normalizeLargeNumber(fromADA(yearlyRunningCosts), 6, true),
            yield: getPercentage(yearlyRunningCosts / ada * 100)
          }
        },
        // Margin rewards
        {
          type: 'margin_rewards',
          daily: {
            ada: normalizeLargeNumber(dailyMargin, 6, true),
            currency: normalizeLargeNumber(fromADA(dailyMargin), 6, true),
            yield: getPercentage(dailyMargin / ada * 100)
          },
          epoch: {
            ada: normalizeLargeNumber(epochMargin, 6, true),
            currency: normalizeLargeNumber(fromADA(epochMargin), 6, true),
            yield: getPercentage(epochMargin / ada * 100)
          },
          yearly: {
            ada: normalizeLargeNumber(yearlyMargin, 6, true),
            currency: normalizeLargeNumber(fromADA(yearlyMargin), 6, true),
            yield: getPercentage(yearlyMargin / ada * 100)
          }
        },
        // Delegation rewards
        {
          type: 'delegation_rewards',
          daily: {
            ada: normalizeLargeNumber(dailyReward, 6, true),
            currency: normalizeLargeNumber(fromADA(dailyReward), 6, true),
            yield: getPercentage(dailyReward / ada * 100)
          },
          epoch: {
            ada: normalizeLargeNumber(epochReward, 6, true),
            currency: normalizeLargeNumber(fromADA(epochReward), 6, true),
            yield: getPercentage(epochReward / ada * 100)
          },
          yearly: {
            ada: normalizeLargeNumber(yearlyReward, 6, true),
            currency: normalizeLargeNumber(fromADA(yearlyReward), 6, true),
            yield: getPercentage(yearlyReward / ada * 100)
          }
        },
        // Combined rewards
        {
          type: 'combined_rewards',
          daily: {
            ada: normalizeLargeNumber(dailyReward + dailyMargin, 6, true),
            currency: normalizeLargeNumber(fromADA(dailyReward + dailyMargin), 6, true),
            yield: getPercentage((dailyReward + dailyMargin) / ada * 100)
          },
          epoch: {
            ada: normalizeLargeNumber(epochReward + epochMargin, 6, true),
            currency: normalizeLargeNumber(fromADA(epochReward + epochMargin), 6, true),
            yield: getPercentage((epochReward + epochMargin) / ada * 100)
          },
          yearly: {
            ada: normalizeLargeNumber(yearlyReward + yearlyMargin, 6, true),
            currency: normalizeLargeNumber(fromADA(yearlyReward + yearlyMargin), 6, true),
            yield: getPercentage((yearlyReward + yearlyMargin) / ada * 100)
          }
        }
      ]
    })
  }, [ values, privateStakePool ])

  function getTitle (type) {
    if (type === 'running_costs') return content.staking_calculator.running_costs
    if (type === 'margin_rewards') return content.staking_calculator.stake_pool_operation_rewards
    if (type === 'delegation_rewards') return content.staking_calculator.delegation_rewards
    if (type === 'combined_rewards') return content.staking_calculator.combined_rewards
    return 'N/A'
  }

  function isHidden (type) {
    if (type === 'combined_rewards') return true
    if (privateStakePool && type === 'margin_rewards') return true
    if (privateStakePool && type === 'running_costs') return true
    return false
  }

  return (
    <Fragment>
      <HalfWidthGroup>
        <div>
          <PrivateStakePoolSwitch
            checked={privateStakePool}
            onChange={(value) => setPrivateStakePool(value)}
            label={content.staking_calculator.private_stake_pool_label}
            helperText={content.staking_calculator.private_stake_pool_descriptor}
          />
        </div>
        <div />
      </HalfWidthGroup>
      <HalfWidthGroup>
        <div>
          <ADAAmount
            value={values.ada}
            onChange={value => setValue('ada', value)}
            label={content.staking_calculator.ada_label_operator}
            helperText={content.staking_calculator.ada_descriptor_operator}
            adaSymbol={getCurrencySymbol('ADA')}
          />
        </div>
        <div>
          <SelectCurrency
            value={values.currency}
            onChange={value => setValue('currency', value)}
            label={content.staking_calculator.currency_label}
            helperText={content.staking_calculator.currency_descriptor}
            currencies={currencies}
          />
        </div>
      </HalfWidthGroup>
      {(showAdvancedOptions || !privateStakePool) &&
        <Fragment>
          <HalfWidthGroup>
            {showAdvancedOptions && values.currency.key !== 'ADA' &&
              <div>
                <ExchangeRate
                  value={values.currency.exchangeRate}
                  onChange={value => setValue('currency', { ...values.currency, exchangeRate: value })}
                  label={content.staking_calculator.exchange_rate_label}
                  helperText={<Markdown source={content.staking_calculator.exchange_rate_descriptor.replace(/{{\s?currency\s?}}/g, values.currency.key)} />}
                  symbol={getCurrencySymbol(values.currency.key)}
                />
              </div>
            }
            <div>
              <StakePoolFixedFee
                toADA={toADA}
                fromADA={fromADA}
                value={values.stakePoolFixedFee}
                onChange={value => setValue('stakePoolFixedFee', value)}
                label={content.staking_calculator.fixed_fee_label}
                helperText={
                  <Markdown
                    source={
                      values.currency.key === 'ADA'
                        ? content.staking_calculator.fixed_fee_descriptor_ada
                        : content.staking_calculator.fixed_fee_descriptor.replace(/{{\s?amount\s?}}/g, normalizeLargeNumber(toADA(parseFloat(values.stakePoolFixedFee)), 6))
                    }
                  />
                }
                symbol={getCurrencySymbol(values.currency.key)}
              />
            </div>
            {!showAdvancedOptions && <div />}
            {showAdvancedOptions && privateStakePool &&
              <div>
                <TransactionFeesPerEpoch
                  value={values.transactionFeesPerEpoch}
                  onChange={value => setValue('transactionFeesPerEpoch', value)}
                  label={content.staking_calculator.transaction_fees_per_epoch_label}
                  adaSymbol={getCurrencySymbol('ADA')}
                  helperText={content.staking_calculator.transaction_fees_per_epoch_descriptor}
                />
              </div>
            }
          </HalfWidthGroup>
          {showAdvancedOptions && !privateStakePool &&
            <HalfWidthGroup>
              <div>
                <TransactionFeesPerEpoch
                  value={values.transactionFeesPerEpoch}
                  onChange={value => setValue('transactionFeesPerEpoch', value)}
                  label={content.staking_calculator.transaction_fees_per_epoch_label}
                  adaSymbol={getCurrencySymbol('ADA')}
                  helperText={content.staking_calculator.transaction_fees_per_epoch_descriptor}
                />
              </div>
            </HalfWidthGroup>
          }
        </Fragment>
      }
      {showAdvancedOptions &&
        <Fragment>
          {!privateStakePool &&
            <FullWidthGroup>
              <StakePoolControl
                value={values.stakePoolControl}
                onChange={value => setValue('stakePoolControl', value)}
                label={content.staking_calculator.stake_pool_control_label}
                helperText={content.staking_calculator.stake_pool_control_descriptor}
                saturated={values.stakePoolControl > 1 / values.totalStakePools}
                totalADAInCirculation={values.totalADAInCirculation}
                totalStakePools={values.totalStakePools}
                saturationLabel={(
                  <Fragment>
                    {content.staking_calculator.saturation} {getCurrencySymbol('ADA')} {normalizeLargeNumber(1 / values.totalStakePools * values.totalADAInCirculation, 6)}
                  </Fragment>
                )}
                adaSymbol={getCurrencySymbol('ADA')}
                normalizeLargeNumber={normalizeLargeNumber}
                minValue={0}
              />
            </FullWidthGroup>
          }
          <FullWidthGroup>
            <TotalStakePools
              value={values.totalStakePools}
              onChange={value => setValue('totalStakePools', value)}
              label={content.staking_calculator.total_stake_pools_label}
            />
          </FullWidthGroup>
          {!privateStakePool &&
            <FullWidthGroup>
              <StakePoolMargin
                value={values.stakePoolMargin}
                onChange={value => setValue('stakePoolMargin', value)}
                label={content.staking_calculator.stake_pool_margin_label}
                helperText={content.staking_calculator.stake_pool_margin_descriptor}
              />
            </FullWidthGroup>
          }
          <FullWidthGroup>
            <StakePoolPerformance
              value={values.stakePoolPerformance}
              onChange={value => setValue('stakePoolPerformance', value)}
              label={content.staking_calculator.stake_pool_performance_label}
              helperText={content.staking_calculator.stake_pool_performance_descriptor}
            />
          </FullWidthGroup>
          <FullWidthGroup>
            <InfluenceFactor
              value={values.influenceFactor}
              onChange={value => setValue('influenceFactor', value)}
              label={content.staking_calculator.influence_factor_label}
              helperText={content.staking_calculator.influence_factor_descriptor}
            />
          </FullWidthGroup>
          <FullWidthGroup>
            <TreasuryRate
              value={values.treasuryRate}
              onChange={value => setValue('treasuryRate', value)}
              label={content.staking_calculator.treasury_rate_label}
              helperText={content.staking_calculator.treasury_rate_descriptor}
            />
          </FullWidthGroup>
          <FullWidthGroup>
            <ExpansionRate
              value={values.expansionRate}
              onChange={value => setValue('expansionRate', value)}
              label={content.staking_calculator.expansion_rate_label}
              helperText={content.staking_calculator.expansion_rate_descriptor}
            />
          </FullWidthGroup>
        </Fragment>
      }
      <Rewards
        containerRef={containerRef}
        fixedRewardsIndex={privateStakePool ? 2 : 3}
        normalizeLargeNumber={normalizeLargeNumber}
        graphData={[
          {
            yLabel: typeof getCurrencySymbol(values.currency.key) === 'string'
              ? `${values.currency.key} (${getCurrencySymbol(values.currency.key)})`
              : values.currency.key,
            currencySymbol: typeof getCurrencySymbol(values.currency.key) === 'string'
              ? getCurrencySymbol(values.currency.key)
              : values.currency.key,
            key: 'total_ada',
            title: 'Rewards breakdown',
            data: rewards.graphData
          }
        ]}
        rewards={rewards.breakdown.map((reward) => ({
          title: getTitle(reward.type),
          hidden: isHidden(reward.type),
          labels: {
            ada: 'ADA',
            currency: values.currency.key,
            currencySymbol: getCurrencySymbol(values.currency.key),
            adaSymbol: getCurrencySymbol('ADA'),
            yield: reward.type === 'running_costs' ? null : content.staking_calculator.yield,
            daily: content.staking_calculator.daily,
            yearly: content.staking_calculator.yearly,
            firstEpoch: content.staking_calculator.first_epoch
          },
          breakdown: reward
        }))}
      />
    </Fragment>
  )
}

Operator.propTypes = {
  values: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  toADA: PropTypes.func.isRequired,
  fromADA: PropTypes.func.isRequired,
  HalfWidthGroup: PropTypes.object.isRequired,
  FullWidthGroup: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
  showAdvancedOptions: PropTypes.bool.isRequired,
  getCurrencySymbol: PropTypes.func.isRequired,
  normalizeLargeNumber: PropTypes.func.isRequired,
  currencies: PropTypes.array.isRequired,
  getDistributableRewards: PropTypes.func.isRequired,
  getTotalADAInCirculation: PropTypes.func.isRequired,
  containerRef: PropTypes.object.isRequired
}

export default Operator
