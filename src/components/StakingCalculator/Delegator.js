import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Markdown from '@input-output-hk/front-end-core-components/components/Markdown'
import ADAAmount from './inputs/ADAAmount'
import SelectCurrency from './inputs/SelectCurrency'
import ExchangeRate from './inputs/ExchangeRate'
import StakePoolFixedFee from './inputs/StakePoolFixedFee'
import StakePoolControl from './inputs/StakePoolControl'
import TotalStakePools from './inputs/TotalStakePools'
import OperatorsStake from './inputs/OperatorsStake'
import StakePoolMargin from './inputs/StakePoolMargin'
import StakePoolPerformance from './inputs/StakePoolPerformance'
import TransactionFeesPerEpoch from './inputs/TransactionFeesPerEpoch'
import InfluenceFactor from './inputs/InfluenceFactor'
import Rewards from './Rewards'
import TreasuryRate from './inputs/TreasuryRate'
import ExpansionRate from './inputs/ExpansionRate'

const Delegator = ({
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
  containerRef,
}) => {
  const [rewards, setRewards] = useState({
    graphData: [],
    breakdown: [
      {
        daily: {
          ada: normalizeLargeNumber(0, 6),
          currency: normalizeLargeNumber(0, 6),
          yield: normalizeLargeNumber(0, 2),
        },
        epoch: {
          ada: normalizeLargeNumber(0, 6),
          currency: normalizeLargeNumber(0, 6),
          yield: normalizeLargeNumber(0, 2),
        },
        yearly: {
          ada: normalizeLargeNumber(0, 6),
          currency: normalizeLargeNumber(0, 6),
          yield: normalizeLargeNumber(0, 2),
        },
      },
    ],
  })

  function getEpochReward(epoch, ada, operatorsStake) {
    const totalADAInCirculation = getTotalADAInCirculation(epoch)
    let stakePoolFixedFee = toADA(parseFloat(values.stakePoolFixedFee))
    if (isNaN(stakePoolFixedFee)) stakePoolFixedFee = 0
    const epochDistribution = getDistributableRewards(epoch)
    const poolSaturation = totalADAInCirculation / values.totalStakePools
    const control = values.stakePoolControl * totalADAInCirculation
    const cappedADA = Math.min(
      ada,
      Math.max(0, Math.min(poolSaturation, control) - operatorsStake),
    )
    const operatorsPledge = Math.min(poolSaturation, operatorsStake)
    const operatorsPledgePercentage = operatorsPledge / totalADAInCirculation

    const z0 = 1 / values.totalStakePools
    const sigmaPrime = Math.min(z0, values.stakePoolControl)

    let grossPoolReward =
      (epochDistribution / (1 + values.influenceFactor)) *
      (sigmaPrime +
        values.influenceFactor *
          operatorsPledgePercentage *
          (((sigmaPrime - operatorsPledgePercentage) *
            ((z0 - sigmaPrime) / z0)) /
            z0))
    const penalty = (1 - values.stakePoolPerformance) * grossPoolReward
    grossPoolReward = Math.max(0, grossPoolReward - penalty)
    grossPoolReward = Math.max(
      0,
      grossPoolReward - values.epochDurationInDays * stakePoolFixedFee,
    )
    const margin = grossPoolReward * values.stakePoolMargin
    const netReward = grossPoolReward - margin
    const adaInPool = Math.min(
      values.stakePoolControl * values.totalADAInCirculation,
      poolSaturation,
    )
    const operatorsReward = netReward * (operatorsPledge / adaInPool)
    const stakePoolControlADA = values.stakePoolControl * totalADAInCirculation
    const reward = (netReward * cappedADA) / stakePoolControlADA
    return {
      ada: ada + reward,
      reward: reward,
      operatorsStake: operatorsStake + operatorsReward + margin,
    }
  }

  function getRewards(initialADA, initialOperatorsStake) {
    const rewards = []
    const n = Math.floor(365 / values.epochDurationInDays)
    while (rewards.length < n) {
      rewards.push(
        getEpochReward(
          values.currentEpoch + rewards.length,
          (rewards[rewards.length - 1] || {}).ada || initialADA,
          (rewards[rewards.length - 1] || {}).operatorsStake ||
            initialOperatorsStake,
        ),
      )
    }

    return rewards
  }

  useEffect(() => {
    let ada = parseFloat(values.ada)
    let operatorsStake = parseFloat(values.operatorsStake)
    if (isNaN(ada)) ada = 0
    if (isNaN(operatorsStake)) operatorsStake = 0
    const rewards = getRewards(ada, operatorsStake)

    const epochReward = rewards[0].ada - ada
    const dailyReward = epochReward / values.epochDurationInDays
    const yearlyReward = rewards[rewards.length - 1].ada - ada

    const getPercentage = n => {
      if (n === Infinity) return 'N/A'
      return `${normalizeLargeNumber(n, 4, true)}%`
    }

    setRewards({
      graphData: [
        { x: 0, y: fromADA(ada), reward: 0 },
        ...rewards.map((reward, index) => ({
          x: index + 1,
          y: fromADA(reward.ada),
          reward: fromADA(reward.reward),
        })),
      ],
      breakdown: [
        {
          daily: {
            ada: normalizeLargeNumber(dailyReward, 6, true),
            currency: normalizeLargeNumber(fromADA(dailyReward), 6, true),
            yield: getPercentage((dailyReward / ada) * 100),
          },
          epoch: {
            ada: normalizeLargeNumber(epochReward, 6, true),
            currency: normalizeLargeNumber(fromADA(epochReward), 6, true),
            yield: getPercentage((epochReward / ada) * 100),
          },
          yearly: {
            ada: normalizeLargeNumber(yearlyReward, 6, true),
            currency: normalizeLargeNumber(fromADA(yearlyReward), 6, true),
            yield: getPercentage((yearlyReward / ada) * 100),
          },
        },
      ],
    })
  }, [values])

  return (
    <Fragment>
      <HalfWidthGroup>
        <div>
          <ADAAmount
            value={values.ada}
            onChange={value => setValue('ada', value)}
            label={content.staking_calculator.ada_label}
            helperText={content.staking_calculator.ada_descriptor}
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
      {showAdvancedOptions && (
        <Fragment>
          <HalfWidthGroup>
            {values.currency.key !== 'ADA' && (
              <div>
                <ExchangeRate
                  value={values.currency.exchangeRate}
                  onChange={value =>
                    setValue('currency', {
                      ...values.currency,
                      exchangeRate: value,
                    })
                  }
                  label={content.staking_calculator.exchange_rate_label}
                  helperText={
                    <Markdown
                      source={content.staking_calculator.exchange_rate_descriptor.replace(
                        /{{\s?currency\s?}}/g,
                        values.currency.key,
                      )}
                    />
                  }
                  symbol={getCurrencySymbol(values.currency.key)}
                />
              </div>
            )}
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
                        : content.staking_calculator.fixed_fee_descriptor.replace(
                            /{{\s?amount\s?}}/g,
                            normalizeLargeNumber(
                              parseFloat(toADA(values.stakePoolFixedFee)),
                              6,
                            ),
                          )
                    }
                  />
                }
                symbol={getCurrencySymbol(values.currency.key)}
              />
            </div>
          </HalfWidthGroup>
          <HalfWidthGroup>
            <div>
              <TransactionFeesPerEpoch
                value={values.transactionFeesPerEpoch}
                onChange={value => setValue('transactionFeesPerEpoch', value)}
                label={
                  content.staking_calculator.transaction_fees_per_epoch_label
                }
                adaSymbol={getCurrencySymbol('ADA')}
                helperText={
                  content.staking_calculator
                    .transaction_fees_per_epoch_descriptor
                }
              />
            </div>
            <div>
              <OperatorsStake
                value={values.operatorsStake}
                onChange={value => setValue('operatorsStake', value)}
                label={content.staking_calculator.operators_stake_label}
                helperText={
                  content.staking_calculator.operators_stake_descriptor
                }
                adaSymbol={getCurrencySymbol('ADA')}
              />
            </div>
          </HalfWidthGroup>
          <FullWidthGroup>
            <StakePoolControl
              value={values.stakePoolControl}
              onChange={value => setValue('stakePoolControl', value)}
              label={content.staking_calculator.stake_pool_control_label}
              helperText={
                content.staking_calculator.stake_pool_control_descriptor
              }
              saturated={values.stakePoolControl > 1 / values.totalStakePools}
              totalADAInCirculation={values.totalADAInCirculation}
              totalStakePools={values.totalStakePools}
              saturationLabel={
                <Fragment>
                  {content.staking_calculator.saturation}{' '}
                  {getCurrencySymbol('ADA')}{' '}
                  {normalizeLargeNumber(
                    (1 / values.totalStakePools) * values.totalADAInCirculation,
                    6,
                  )}
                </Fragment>
              }
              adaSymbol={getCurrencySymbol('ADA')}
              normalizeLargeNumber={normalizeLargeNumber}
              minValue={0}
            />
          </FullWidthGroup>
          <FullWidthGroup>
            <TotalStakePools
              value={values.totalStakePools}
              onChange={value => setValue('totalStakePools', value)}
              label={content.staking_calculator.total_stake_pools_label}
            />
          </FullWidthGroup>
          <FullWidthGroup>
            <StakePoolMargin
              value={values.stakePoolMargin}
              onChange={value => setValue('stakePoolMargin', value)}
              label={content.staking_calculator.stake_pool_margin_label}
              helperText={
                content.staking_calculator.stake_pool_margin_descriptor
              }
            />
          </FullWidthGroup>
          <FullWidthGroup>
            <StakePoolPerformance
              value={values.stakePoolPerformance}
              onChange={value => setValue('stakePoolPerformance', value)}
              label={content.staking_calculator.stake_pool_performance_label}
              helperText={
                content.staking_calculator.stake_pool_performance_descriptor
              }
            />
          </FullWidthGroup>
          <FullWidthGroup>
            <InfluenceFactor
              value={values.influenceFactor}
              onChange={value => setValue('influenceFactor', value)}
              label={content.staking_calculator.influence_factor_label}
              helperText={
                content.staking_calculator.influence_factor_descriptor
              }
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
      )}
      <Rewards
        fixedRewardsIndex={0}
        containerRef={containerRef}
        normalizeLargeNumber={normalizeLargeNumber}
        graphData={[
          {
            yLabel:
              typeof getCurrencySymbol(values.currency.key) === 'string'
                ? `${values.currency.key} (${getCurrencySymbol(
                    values.currency.key,
                  )})`
                : values.currency.key,
            currencySymbol:
              typeof getCurrencySymbol(values.currency.key) === 'string'
                ? getCurrencySymbol(values.currency.key)
                : values.currency.key,
            key: 'total_ada',
            title: 'Rewards breakdown',
            data: rewards.graphData,
          },
        ]}
        rewards={rewards.breakdown.map(reward => ({
          title: content.staking_calculator.delegation_rewards,
          labels: {
            ada: 'ADA',
            currency: values.currency.key,
            currencySymbol: getCurrencySymbol(values.currency.key),
            adaSymbol: getCurrencySymbol('ADA'),
            yield: content.staking_calculator.delegation_rewards,
            yearly: content.staking_calculator.yearly,
          },
          breakdown: reward,
        }))}
      />
    </Fragment>
  )
}

Delegator.propTypes = {
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
  containerRef: PropTypes.object.isRequired,
}

export default Delegator
