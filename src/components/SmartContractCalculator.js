import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { MdRotateLeft, MdClear } from 'react-icons/md'
import TextField from '@material-ui/core/TextField'
import ReactTooltip from 'react-tooltip'

import CardanoLogo from './StakingCalculator/CardanoLogo'

export default function SmartContractCalculator() {
  const [perByteCost, setPerByteCost] = useState(44)
  const [perStepCost, setPerStepCost] = useState(0.0000721)
  const [perMemUnitCost, setMemUnitCost] = useState(0.0577)
  const [perTransactionCost, setPerTransactionCost] = useState(155381)
  const [showParams, _setShowParams] = useState(false)

  const [adaPrice, setAdaPrice] = useState()
  const [initialized, setInitialized] = useState(false)
  const [unableToGetPrice, setUnableToGetPrice] = useState(false)
  const [adaPriceScenario, setAdaPriceScenario] = useState(0)

  const [transactions, setTransactions] = useState([
    {
      txSize: 0,
      cpuSteps: 0,
      memUnits: 0,
    },
  ])

  useEffect(() => {
    const getAdaPrice = async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/coins/cardano',
        )
        const data = await res.json()
        // eslint-disable-next-line camelcase
        const price = data?.market_data?.current_price?.usd
        setAdaPrice(parseFloat(price))
        setAdaPriceScenario(parseFloat(price))
        setInitialized(true)
      } catch (e) {
        setUnableToGetPrice(true)
        setAdaPrice(2.4)
        setInitialized(true)
      }
    }

    if (!initialized) getAdaPrice()
  }, [initialized])

  const txPrice = t =>
    !t.txSize && !t.cpuSteps && !t.memUnits
      ? 0
      : ((perByteCost || 0) * (t.txSize || 0) +
          (perStepCost || 0) * (t.cpuSteps || 0) +
          (perMemUnitCost || 0) * (t.memUnits || 0) +
          (perTransactionCost || 0)) /
        1000000

  const dappFee = () => {
    let fee = 0
    for (const t of transactions) fee = fee + txPrice(t)
    return fee
  }

  return initialized ? (
    <>
      <ReactTooltip />
      {showParams && (
        <Params>
          <div>
            <TextField
              label="Per Byte Cost"
              helperText="Cost of each byte"
              value={perByteCost}
              type="number"
              min="0"
              onChange={e => {
                let input = parseInt(e.target.value)
                if (input < 0) input = 0
                setPerByteCost(input)
              }}
              onBlur={e => !e.target.value && setPerByteCost(0)}
            />
          </div>

          <div>
            <TextField
              label="Per Step Cost"
              helperText="Cost of each step"
              type="number"
              min="0"
              value={perStepCost}
              onChange={e => {
                let input = parseInt(e.target.value)
                if (input < 0) input = 0
                setPerStepCost(input)
              }}
              onBlur={e => !e.target.value && setPerStepCost(0)}
            />
          </div>

          <div>
            <TextField
              label="Per Mem Unit Cost"
              helperText="Cost of each mem unit"
              type="number"
              min="0"
              value={perMemUnitCost}
              onChange={e => {
                let input = parseInt(e.target.value)
                if (input < 0) input = 0
                setMemUnitCost(input)
              }}
              onBlur={e => !e.target.value && setMemUnitCost(0)}
            />
          </div>

          <div>
            <TextField
              label="Per Transaction Cost"
              helperText="Per Transaction Cost"
              type="number"
              min="0"
              value={perTransactionCost}
              onChange={e => setPerTransactionCost(parseInt(e.target.value))}
              onBlur={e => !e.target.value && setPerTransactionCost(0)}
            />
          </div>
        </Params>
      )}
      <Transactions>
        {transactions.map((t, i) => (
          <Transaction key={i}>
            <Title>Transaction {i + 1}</Title>
            <DeleteButton
              onClick={() => {
                const txs = transactions
                txs.splice(i, 1)
                console.log(txs)
                setTransactions([...txs])
              }}
            >
              <MdClear />
            </DeleteButton>
            <Fields>
              <FieldContainer>
                <TextField
                  type="number"
                  min="0"
                  max="16384"
                  value={t.txSize}
                  label="Size (bytes)"
                  helperText="max 16KB (16384B)"
                  onChange={e => {
                    const txs = transactions
                    let input = parseInt(e.target.value)
                    if (input < 0) input = 0

                    txs[i].txSize = input > 16384 ? 16384 : input

                    setTransactions([...txs])
                  }}
                  onBlur={e => {
                    if (e.target.value) return null
                    const txs = transactions
                    txs[i].txSize = 0
                    setTransactions([...txs])
                  }}
                />
                <Tooltip
                  data-tip="The size of an on-chain transaction in bytes, which can be derived<br/> from the transaction prepared on-disk. Size varies depending on transaction content.<br/> A typical transaction for a smart contract will be between 3KB-5KB."
                  data-multiline
                >
                  ?
                </Tooltip>
              </FieldContainer>

              <FieldContainer>
                <TextField
                  type="number"
                  min="0"
                  max="10000000000"
                  value={t.cpuSteps}
                  label="CPU Steps"
                  helperText="max 10000000000"
                  onChange={e => {
                    const txs = transactions
                    let input = parseInt(e.target.value)
                    if (input < 0) input = 0
                    txs[i].cpuSteps = input > 10000000000 ? 10000000000 : input

                    setTransactions([...txs])
                  }}
                  onBlur={e => {
                    if (e.target.value) return null
                    const txs = transactions
                    txs[i].cpuSteps = 0
                    setTransactions([...txs])
                  }}
                />
                <Tooltip
                  data-tip="A variable abstraction of the time a transaction takes to execute<br/> on a reference computer. More complex contracts require more CPU steps."
                  data-multiline
                >
                  ?
                </Tooltip>
              </FieldContainer>

              <FieldContainer>
                <TextField
                  min="0"
                  max="11250000"
                  value={t.memUnits}
                  label="Memory Units (bytes)"
                  helperText="max 11250000B"
                  type="number"
                  onChange={e => {
                    const txs = transactions
                    let input = parseInt(e.target.value)
                    if (input < 0) input = 0
                    txs[i].memUnits = input > 11250000 ? 11250000 : input
                    setTransactions([...txs])
                  }}
                  onBlur={e => {
                    if (e.target.value) return null
                    const txs = transactions
                    txs[i].memUnits = 0
                    setTransactions([...txs])
                  }}
                />
                <Tooltip
                  data-tip="Memory allocated by the transaction, in bytes.<br/> More complex contracts usually require higher memory allocation."
                  data-multiline
                >
                  ?
                </Tooltip>
              </FieldContainer>
            </Fields>
            <TxPrice>
              <span>₳ {txPrice(t).toFixed(6)}</span>
              Estimated Transaction Price in ADA
            </TxPrice>
          </Transaction>
        ))}
      </Transactions>

      <Controls>
        {/* temporarily removed
        <RoundedButton
          onClick={() => setShowParams(!showParams)}
        >
          {showParams ? 'Hide' : 'Show'} network parameters
          <span>{showParams ? <MdVisibilityOff /> : <MdVisibility />}</span>
        </RoundedButton>
        */}
        <RoundedButton
          onClick={() =>
            setTransactions([
              ...transactions,
              {
                txSize: 0,
                cpuSteps: 0,
                memUnits: 0,
              },
            ])
          }
        >
          Add Transaction
        </RoundedButton>
        <RoundedButton
          onClick={() => {
            setPerByteCost(44)
            setPerStepCost(0.0000721)
            setMemUnitCost(0.0577)
            setPerTransactionCost(155381)
            setTransactions([
              {
                txSize: 0,
                cpuSteps: 0,
                memUnits: 0,
              },
            ])
          }}
        >
          Reset All{' '}
          <span>
            <MdRotateLeft />
          </span>
        </RoundedButton>
      </Controls>

      <FeeTitle>Total Estimated Dapp Fee:</FeeTitle>
      <Results>
        <div>
          {' '}
          <Price>${(dappFee() * adaPrice).toFixed(2)} USD</Price>
          <PriceInfo>
            When 1 ADA = ${adaPrice}
            {!unableToGetPrice && <span>Rate supplied by CoinGecko</span>}
          </PriceInfo>
          <CardanoLogo active />
        </div>
        <div>
          <Price>${(dappFee() * adaPriceScenario).toFixed(2)} USD</Price>
          <PriceInfo>
            When 1 ADA = $
            <input
              type="number"
              min="0"
              value={adaPriceScenario}
              onChange={e => setAdaPriceScenario(e.target.value)}
            />
          </PriceInfo>
          <CardanoLogo active={false} />
        </div>
      </Results>
      <h5>How are the costs calculated?</h5>
      <p>
        Primitive Plutus operations (the internal building blocks) are evaluated
        on a reference architecture to give the costs for each primitive in
        terms of the basic CPU and memory units that it uses. These are scaled
        based on the number of each different primitive that is used by a smart
        contract, and overall costs for a smart contract are calculated based on
        the current costs for each CPU and memory unit, plus the size of the
        transaction (including the size of the script, plus any datums that it
        needs).
        <br />
        <br />
        <br />
      </p>
    </>
  ) : (
    <div>Loading...</div>
  )
}

const Controls = styled.div`
  display: flex;
`

const RoundedButton = styled.button`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  outline: 0;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-family: Chivo, sans-serif;
  font-weight: 400;
  line-height: 1.7;
  letter-spacing: 0.1rem;
  width: 100%;
  padding: 1rem 2rem;
  border-radius: 1.8rem;
  color: #0a38a6;
  border: 1px solid #0033ad;
  background-color: #fff;

  &:first-of-type {
    margin-right: 10px;
  }

  &:nth-of-type(2) {
    margin-left: 10px;
  }

  &:hover {
    background-color: rgba(0, 51, 173, 0.04);
  }

  span {
    display: flex;
    align-items: center;
    margin-left: 5px;
  }
`

const Params = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0 25px 0;

  > div {
    width: 50%;
    padding: 0 20px 20px 20px;
  }

  .MuiTextField-root {
    width: 100%;
  }
`

const Transactions = styled.div`
  font-size: 16px;
  padding: 30px 0 0 0;
`

const Transaction = styled.div`
  border: 0.1rem solid rgba(29, 30, 33, 0.3);
  padding: 30px;
  background-color: rgba(0, 51, 173, 0.04);
  border-radius: 1.8rem;
  position: relative;
  margin-bottom: 30px;
`

const Fields = styled.div`
  padding: 20px 0 40px 0;
  display: flex;
  flex-wrap: wrap;
  --margin: 1rem;
  --multiplier: calc(720px - 100%);
  margin: calc(var(--margin) * -1); /* excess margin removed */

  & > * {
    min-width: calc(33% - (var(--margin) * 2)); /* remove from both sides */
    max-width: 100%;
    flex-grow: 1;
    flex-basis: calc(var(--multiplier) * 999);
    margin: var(--margin);
  }
`

const Title = styled.h4`
  font-size: 18px;
  margin: 0 0 10px 0;
`

const DeleteButton = styled.button`
  position: absolute;
  top: -15px;
  right: -15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  outline: 0;
  align-items: center;
  justify-content: center;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 40px;
  color: #0a38a6;
  border: 1px solid #0033ad;
  background-color: #fff;
  height: 30px;
  width: 30px;

  &:hover {
    background-color: rgba(0, 51, 173, 0.04);
  }
`

const TxPrice = styled.span`
  font-size: 14px;

  span {
    font-size: 22px;
    display: block;
  }
`

const Results = styled.div`
  display: flex;
  margin-bottom: 70px;

  @media screen and (max-width: 600px) {
    display: block;
  }

  > div {
    flex: 1;
    overflow: hidden;
    position: relative;
    border-radius: 0.4rem;
    height: 200px;
    border: 1px solid #0033ad;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 18px;

    &:first-of-type {
      margin-right: 10px;
      background-color: #0033ad;
      color: #fff;
    }

    &:nth-of-type(2) {
      margin-left: 20px;
    }

    > div {
      position: absolute;
      bottom: 0;

      svg {
        height: 130px;
        margin-bottom: 1rem;
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

    @media screen and (max-width: 600px) {
      margin: 0 0 20px 0 !important;
    }

    input {
      width: 60px;
      font-size: 14px;
      border: 1px solid rgba(0, 0, 0, 0.42);
      padding-left: 0 3px;
      margin-left: 5px;
    }
  }
`

const FeeTitle = styled.h4`
  margin: 55px 0 25px 0;
`

const Price = styled.span`
  font-size: 38px;
  font-weight: 300;
  display: block;
`

const PriceInfo = styled.span`
  display: block;
  text-align: center;
  font-size: 14px;

  span {
    display: block;
    font-size: 11px;
  }
`

const FieldContainer = styled.div`
  position: relative;
  padding: 0;

  label {
    font-size: 20px;
  }
`

const Tooltip = styled.div`
  background-color: #7e98d4;
  display: flex;
  width: 16px;
  height: 16px;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  color: #fff;
  font-weight: bold;
  font-size: 12px;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 180px;
`
