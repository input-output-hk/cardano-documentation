import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FormControl from '@material-ui/core/FormControl'
import InputAdornment from '@material-ui/core/InputAdornment'
import {
  StyledSlider,
  StyledFormHelperText,
  TextFieldWrapper,
  StyledTextField,
  StyledFormControl,
} from '../../SharedComponents'

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  font-family: 'Chivo';
  background-color: var(--controls-background-color);
  padding: 1.5rem;
  border-radius: 4px;
  margin-top: 1.5rem;

  @media (max-width: 767px) {
    aspect-ratio: 1/1;
  }
`

const DataContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  padding-bottom: 1rem;

  align-items: center;

  div:nth-child(2) {
    flex-basis: 65%;
  }

  @media (max-width: 767px) {
    div:nth-child(2) {
      flex-basis: auto;
      width: 100%;
    }

    flex-direction: column;
  }
`

const ControllerTextField = styled(StyledTextField)`
  div:first-child {
    flex-basis: 0;
  }
`

const PoolDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
  width: 100%;
  flex-basis: 35%;
  color: var(--controls-color);

  @media (max-width: 767px) {
    flex-direction: row;

    div {
      flex-basis: 50% !important;
    }
  }
`

const Value = styled.span`
  font-size: 1rem;
  line-height: 1.5rem;
`

const StakePoolTotalStake = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const StakePoolSaturation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const StakePoolControl = ({
  value,
  label,
  helperText,
  onChange,
  adaSymbol,
  minValue,
  normalizeLargeNumber,
  saturationLabelHeading,
  saturationLabel,
  totalADAInCirculation,
  totalStakePools,
}) => {
  const [adaAmount, setADAAmount] = useState(`${totalADAInCirculation * value}`)

  useEffect(() => {
    if (value < minValue) onChange(minValue)
  }, [minValue])

  useEffect(() => {
    const amount = parseFloat(adaAmount)
    if (!amount || isNaN(amount) || amount < 0) {
      onChange(0)
    } else {
      onChange(amount / totalADAInCirculation)
    }
  }, [adaAmount])

  const saturationPointOnClick = (e) => {
    e.preventDefault()
    onChange(1 / totalStakePools)
    setADAAmount(`${(1 / totalStakePools) * totalADAInCirculation}`)
  }

  return (
    <Container>
      <StyledFormControl>
        <DataContainer>
          <PoolDataWrapper>
            <StakePoolTotalStake>
              <span>{label}</span>
              <Value>{normalizeLargeNumber(value * 100, 6)}</Value>
            </StakePoolTotalStake>
            <StakePoolSaturation>
              <span>{saturationLabelHeading}</span>
              <Value onClick={saturationPointOnClick}>{saturationLabel}</Value>
            </StakePoolSaturation>
          </PoolDataWrapper>
          <TextFieldWrapper>
            <ControllerTextField
              value={adaAmount}
              type="number"
              fullWidth
              onChange={(e) => setADAAmount(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">{adaSymbol}</InputAdornment>
                ),
                disableUnderline: true,
              }}
            />
          </TextFieldWrapper>
        </DataContainer>
        <StyledSlider
          value={Math.min(Math.sqrt(value), Math.sqrt(0.3))}
          min={0}
          max={Math.sqrt(0.02)}
          step={0.001}
          onChange={(_, v: number | any) => {
            const calculatedValue = Math.pow(v, 2)
            if (calculatedValue === value) return
            let newValue
            if (calculatedValue < minValue) {
              newValue = minValue
            } else if (calculatedValue > Math.sqrt(0.02)) {
              newValue = Math.sqrt(0.02)
            } else {
              newValue = calculatedValue
            }

            onChange(newValue)
            setADAAmount(`${newValue * totalADAInCirculation}`)
          }}
          marks={[
            {
              value: 0,
              label: '0%',
            },
            {
              value: Math.sqrt(0.001),
              label: '0.1%',
            },
            {
              value: Math.sqrt(0.002),
              label: '0.2%',
            },
            {
              value: Math.sqrt(0.005),
              label: '0.5%',
            },
            {
              value: Math.sqrt(0.01),
              label: '1%',
            },
            {
              value: Math.sqrt(0.015),
              label: '1.5%',
            },
            {
              value: Math.sqrt(0.02),
              label: '2%',
            },
          ]}
        />
        <StyledFormHelperText>{helperText}</StyledFormHelperText>
      </StyledFormControl>
    </Container>
  )
}

StakePoolControl.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  totalADAInCirculation: PropTypes.number.isRequired,
  adaSymbol: PropTypes.node.isRequired,
  minValue: PropTypes.number.isRequired,
  totalStakePools: PropTypes.number.isRequired,
  normalizeLargeNumber: PropTypes.func.isRequired,
  saturated: PropTypes.bool.isRequired,
  saturationLabel: PropTypes.node.isRequired,
}

export default StakePoolControl
