import React, { useRef, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Box from '@material-ui/core/Box'
import {
  VictoryChart,
  VictoryTooltip,
  VictoryAxis,
  VictoryLine,
  VictoryVoronoiContainer,
} from 'victory'

const Container = styled.div`
  position: relative;
`

const FixedRewardsContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 300px;
  transition: transform 0.3s ease-in-out;
  overflow: hidden;
  padding: 1.5rem 5.5rem;
  background-color: #1342b2;
  z-index: 10;
  width: 100%;
  max-width: calc(100% - 300px);
  color: #fff;

  &.fixed-results-enter {
    transform: translate(0%, 100%);
  }

  &.fixed-results-enter-active {
    transform: translate(0%, 0);
  }

  &.fixed-results-exit {
    transform: translate(0%, 0);
  }

  &.fixed-results-exit-active {
    transform: translate(0%, 100%);
  }

  @media (max-width: 996px) {
    left: 0;
    max-width: 100%;
  }

  @media (max-width: 767px) {
    padding: 1.5rem;
  }
`

const FixedRewardsContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 85%;
  position: relative;
  z-index: 2;

  justify-content: space-between;

  align-items: center;

  h4 {
    margin: 0;
    font-size: 0.813rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.375rem;
  }

  p {
    margin: 0;

    strong {
      font-size: 1rem;
      font-weight: normal;
    }
  }
  @media (max-width: 767px) {
    flex-direction: column;
    width: 100%;
    align-items: start;
    gap: 1.5rem;
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
            <FixedRewardsContent>
              <h4>
                {reward.labels.yearly} {reward.title}
              </h4>
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
  margin-top: 0rem;
  border-top: 1px solid #1c1e21;
`

const RewardsTableContent = styled(FixedRewardsContent)`
  width: 100%;

  background-color: var(--controls-background-color);
  padding: 1.5rem;
  border-radius: 4px;
`

// const RewardsTableRow = styled.li`
//   display: flex;
//   border-bottom: 0.1rem solid
//     ${new TinyColor(testnetsTheme.palette.text.primary)
//       .setAlpha(0.3)
//       .toString()};

//   &.head {
//     color: ${testnetsTheme.palette.primary.main};

//     svg {
//       fill: ${testnetsTheme.palette.primary.main};
//       stroke: ${testnetsTheme.palette.primary.main};
//     }
//   }

//   > div {
//     flex: 1;
//     margin-left: 2rem;

//     &:first-of-type {
//       text-align: right;
//       margin-left: 0;
//       max-width: 12rem;
//     }
//   }
// `

const RewardTable = ({ reward }) => (
  <RewardsTableContainer>
    <RewardsTableContent>
      <h4>
        {reward.labels.yearly} {reward.title}
      </h4>
      <div>
        <p>
          {reward.labels.currency} ({reward.labels.currencySymbol})
        </p>
        <p>
          <strong>
            {reward.labels.currencySymbol} {reward.breakdown.yearly.currency}
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
    </RewardsTableContent>
  </RewardsTableContainer>
)

RewardTable.propTypes = {
  reward: PropTypes.object.isRequired,
}

const ChartContainer = styled(Box)`
  position: relative;
  padding: 1.5rem;
  background-color: var(--controls-background-color);
  border-radius: 4px;

  h4 {
    text-align: center;
    margin-bottom: 0;
    width: 100%;
    font-weight: normal;
    font-size: 1rem;
  }
`

const RewardsGraph = ({
  title,
  yLabel,
  currencySymbol,
  data,
  normalizeLargeNumber,
}) => (
  <ChartContainer marginTop={3}>
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
          axis: {
            stroke: 'var(--controls-color)',
          },
          tickLabels: {
            fill: 'var(--controls-color)',
            fontFamily: 'Chivo',
            fontSize: 13,
          },
          axisLabel: {
            fill: 'var(--controls-color)',
            fontFamily: 'Chivo',
            fontSize: 13,
            padding: 35,
          },
        }}
      />
      <VictoryAxis
        dependentAxis
        label={yLabel}
        style={{
          axis: {
            stroke: 'var(--controls-color)',
          },
          tickLabels: {
            fill: 'var(--controls-color)',
            fontFamily: 'Chivo',
            fontSize: 13,
          },
          axisLabel: {
            fill: 'var(--controls-color)',
            fontFamily: 'Chivo',
            fontSize: 13,
            padding: 70,
          },
        }}
      />
      <VictoryLine
        style={{
          data: { stroke: 'var(--ifm-color-primary)' },
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
      {graphData.map((graph) => (
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
