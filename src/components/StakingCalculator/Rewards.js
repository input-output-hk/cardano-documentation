import React, { useRef, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Box from '@material-ui/core/Box'
import CardanoLogo from './CardanoLogo'
import { TinyColor } from '@ctrl/tinycolor'
import {
  VictoryChart,
  VictoryTooltip,
  VictoryAxis,
  VictoryLine,
  VictoryVoronoiContainer,
} from 'victory'
import testnetsTheme from '../../utils/testnetsTheme'

const Container = styled.div`
  position: relative;
`

const FixedRewardsContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  transition: transform 0.3s ease-in-out;
  overflow: hidden;
  border-top: 0.3rem solid ${testnetsTheme.palette.primary.main};
  padding: 1rem 4rem;
  background-color: ${testnetsTheme.palette.background.default};
  z-index: 10;
  width: 100%;
  max-width: 80rem;

  .logo {
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translate(-42%, 42%);
    opacity: 0.6;

    svg {
      width: 18rem;
    }
  }

  h4 {
    margin: 0;
  }

  &.fixed-results-enter {
    transform: translate(-50%, 100%);
  }

  &.fixed-results-enter-active {
    transform: translate(-50%, 0);
  }

  &.fixed-results-exit {
    transform: translate(-50%, 0);
  }

  &.fixed-results-exit-active {
    transform: translate(-50%, 100%);
  }

  @media screen and (max-width: 900px) {
    width: 94%;
    max-width: none;
    padding: 1rem 6rem 1rem 2rem;
  }

  @media screen and (max-width: 500px) {
    width: 100%;
  }
`

const FixedRewardsContent = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 2;

  > div {
    flex: 1;
    margin: 2rem;
  }

  p {
    margin: 0;

    strong {
      svg {
        stroke-width: 0.1rem;
      }
    }
  }

  @media screen and (max-width: 720px) {
    .ada-rewards {
      display: none;
    }

    > div {
      margin-right: 1rem;
      margin-left: 0;

      &:last-of-type {
        margin-left: 1rem;
        margin-right: 0;
      }
    }
  }

  @media screen and (max-width: 500px) {
    font-size: 1.4rem;
    flex-direction: column;

    > div {
      flex: auto;
      margin-top: 1rem;
      margin-bottom: 0;
      margin-right: 0;

      &:last-of-type {
        margin-left: 0;
      }
    }
  }
`

const FixedRewards = ({ reward, rootRef, containerRef }) => {
  const [visible, setVisible] = useState(false)

  const onScroll = useCallback(() => {
    if (!rootRef.current || !containerRef.current) return
    const offset = Math.min(200, window.innerHeight / 5) * -1
    const containerTop =
      containerRef.current.getBoundingClientRect().top -
      window.innerHeight -
      offset * 1.5
    const top =
      rootRef.current.getBoundingClientRect().top - window.innerHeight - offset
    if (visible && top < 0) {
      setVisible(false)
    } else if (visible && containerTop >= 0) {
      setVisible(false)
    } else if (!visible && top >= 0 && containerTop < 0) {
      setVisible(true)
    }
  }, [rootRef, containerRef, visible])

  useEffect(() => {
    if (rootRef.current && containerRef.current) {
      onScroll()
      window.addEventListener('scroll', onScroll)
      window.addEventListener('touchmove', onScroll)
      window.addEventListener('resize', onScroll)
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('touchmove', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [rootRef, containerRef, visible])

  return (
    <TransitionGroup>
      {visible && (
        <CSSTransition
          key="fixed-results"
          timeout={300}
          classNames="fixed-results"
        >
          <FixedRewardsContainer>
            <Box textAlign="center">
              <h4>
                {reward.labels.yearly} {reward.title}
              </h4>
            </Box>
            <FixedRewardsContent>
              <div>
                <p>
                  {reward.labels.currency} ({reward.labels.currencySymbol})
                </p>
                <p>
                  <strong>
                    {reward.labels.currencySymbol}{' '}
                    {reward.breakdown.yearly.currency}
                  </strong>
                </p>
              </div>
              {reward.labels.currency !== reward.labels.ada && (
                <div className="ada-rewards">
                  <p>
                    {reward.labels.ada} ({reward.labels.adaSymbol})
                  </p>
                  <p>
                    <strong>
                      {reward.labels.adaSymbol} {reward.breakdown.yearly.ada}
                    </strong>
                  </p>
                </div>
              )}
              {reward.labels.yield !== null && (
                <div>
                  <p>{reward.labels.yield}</p>
                  <p>
                    <strong>{reward.breakdown.yearly.yield}</strong>
                  </p>
                </div>
              )}
            </FixedRewardsContent>
            <div className="logo">
              <CardanoLogo active={false} />
            </div>
          </FixedRewardsContainer>
        </CSSTransition>
      )}
    </TransitionGroup>
  )
}

FixedRewards.propTypes = {
  reward: PropTypes.object.isRequired,
  rootRef: PropTypes.object.isRequired,
  containerRef: PropTypes.object.isRequired,
}

const RewardsTableContainer = styled.div`
  width: 100%;
  margin-top: 3rem;
`

const RewardsTableContent = styled.ul`
  width: 100%;
  overflow: auto;
  list-style: none;
  padding: 0;
  margin: 0;
`

const RewardsTableRow = styled.li`
  display: flex;
  border-bottom: 0.1rem solid
    ${new TinyColor(testnetsTheme.palette.text.primary)
      .setAlpha(0.3)
      .toString()};

  &.head {
    color: ${testnetsTheme.palette.primary.main};

    svg {
      fill: ${testnetsTheme.palette.primary.main};
      stroke: ${testnetsTheme.palette.primary.main};
    }
  }

  > div {
    flex: 1;
    margin-left: 2rem;

    &:first-of-type {
      text-align: right;
      margin-left: 0;
      max-width: 12rem;
    }
  }
`

const RewardTable = ({ reward }) => (
  <RewardsTableContainer>
    <Box textAlign="center">
      <h4>{reward.title}</h4>
    </Box>
    <RewardsTableContent>
      <RewardsTableRow className="head">
        <div />
        <div>
          <p>
            {reward.labels.ada} ({reward.labels.adaSymbol})
          </p>
        </div>
        {reward.labels.currency !== reward.labels.ada && (
          <div>
            <p>
              {reward.labels.currency} ({reward.labels.currencySymbol})
            </p>
          </div>
        )}
        {reward.labels.yield !== null && (
          <div>
            <p>{reward.labels.yield} (%)</p>
          </div>
        )}
      </RewardsTableRow>
      <RewardsTableRow>
        <div>
          <p>{reward.labels.yearly}</p>
        </div>
        <div>
          <p>
            {reward.labels.adaSymbol} {reward.breakdown.yearly.ada}
          </p>
        </div>
        {reward.labels.currency !== reward.labels.ada && (
          <div>
            <p>
              {reward.labels.currencySymbol} {reward.breakdown.yearly.currency}
            </p>
          </div>
        )}
        {reward.labels.yield !== null && (
          <div>
            <p>{reward.breakdown.yearly.yield}</p>
          </div>
        )}
      </RewardsTableRow>
    </RewardsTableContent>
  </RewardsTableContainer>
)

RewardTable.propTypes = {
  reward: PropTypes.object.isRequired,
}

const ChartContainer = styled(Box)`
  position: relative;

  h4 {
    text-align: center;
    margin-bottom: 0;
    position: absolute;
    width: 100%;

    @media screen and (max-width: 500px) {
      top: -2rem;
    }
  }
`

const RewardsGraph = ({
  title,
  yLabel,
  currencySymbol,
  data,
  normalizeLargeNumber,
}) => (
  <ChartContainer marginTop={8}>
    <h4>{title}</h4>
    <VictoryChart
      width={500}
      height={300}
      scale={{ x: 'linear' }}
      padding={{ top: 75, bottom: 55, left: 100, right: 65 }}
      containerComponent={
        <VictoryVoronoiContainer
          voronoiDimension="x"
          labels={({ datum }) =>
            `Epoch: ${datum.x}\n${currencySymbol} ${normalizeLargeNumber(
              datum.y,
              6,
            )}\n${currencySymbol} ${normalizeLargeNumber(datum.reward, 6)}`
          }
        />
      }
    >
      <VictoryAxis
        crossAxis={false}
        label="Epoch"
        style={{
          tickLabels: { fill: testnetsTheme.palette.text.primary },
          axisLabel: { fill: testnetsTheme.palette.text.primary, padding: 35 },
        }}
      />
      <VictoryAxis
        dependentAxis
        label={yLabel}
        style={{
          tickLabels: { fill: testnetsTheme.palette.text.primary },
          axisLabel: { fill: testnetsTheme.palette.text.primary, padding: 70 },
        }}
      />
      <VictoryLine
        style={{
          data: { stroke: testnetsTheme.palette.primary.light },
        }}
        data={data}
        labelComponent={<VictoryTooltip />}
      />
    </VictoryChart>
  </ChartContainer>
)

RewardsGraph.propTypes = {
  title: PropTypes.string.isRequired,
  yLabel: PropTypes.string.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
  ),
  normalizeLargeNumber: PropTypes.func.isRequired,
}

const Rewards = ({
  rewards,
  fixedRewardsIndex,
  graphData,
  containerRef,
  normalizeLargeNumber,
}) => {
  const rootRef = useRef(null)
  return (
    <Container ref={rootRef}>
      <FixedRewards
        containerRef={containerRef}
        reward={rewards[fixedRewardsIndex] || rewards[0]}
        rootRef={rootRef}
      />
      {graphData.map(graph => (
        <RewardsGraph
          title={graph.title}
          normalizeLargeNumber={normalizeLargeNumber}
          key={graph.key}
          data={graph.data}
          yLabel={graph.yLabel}
          currencySymbol={graph.currencySymbol}
        />
      ))}
      {rewards.map((reward, index) =>
        reward.hidden ? null : (
          <RewardTable key={`${index}_${reward.title}`} reward={reward} />
        ),
      )}
    </Container>
  )
}

Rewards.propTypes = {
  containerRef: PropTypes.object.isRequired,
  fixedRewardsIndex: PropTypes.number.isRequired,
  normalizeLargeNumber: PropTypes.func.isRequired,
  graphData: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      yLabel: PropTypes.string.isRequired,
      currencySymbol: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          // Epoch
          x: PropTypes.number.isRequired,
          // ADA
          y: PropTypes.number.isRequired,
          reward: PropTypes.number.isRequired,
        }),
      ).isRequired,
    }),
  ).isRequired,
  rewards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      hidden: PropTypes.bool,
      labels: PropTypes.shape({
        ada: PropTypes.string.isRequired,
        currency: PropTypes.string.isRequired,
        currencySymbol: PropTypes.node.isRequired,
        adaSymbol: PropTypes.node.isRequired,
        yield: PropTypes.string,
        yearly: PropTypes.string.isRequired,
      }),
      breakdown: PropTypes.shape({
        yearly: PropTypes.shape({
          ada: PropTypes.string.isRequired,
          currency: PropTypes.string,
          yield: PropTypes.string.isRequired,
        }),
      }),
    }),
  ).isRequired,
}

export default Rewards
