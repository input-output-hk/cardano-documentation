import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FormControl from '@material-ui/core/FormControl'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Box from '@material-ui/core/Box'
import FormHelperText from '@material-ui/core/FormHelperText'
import Slider from '@material-ui/core/Slider'

const Container = styled.div`
  text-align: center;

  .MuiFormHelperText-root {
    text-align: center;
  }
`

const InputLabel = styled.label`
  font-size: 1.2rem;

  span {
    margin-top: 0.4rem;
    display: block;
  }
`

const SaturationPoint = styled.span`
  cursor: pointer;
`

const TextFieldInput = styled(TextField)`
  input {
    text-align: center;
  }
`

const StakePoolControl = ({ value, label, helperText, onChange, adaSymbol, minValue, normalizeLargeNumber, saturated, saturationLabel, totalADAInCirculation, totalStakePools }) => {
  const [ adaAmount, setADAAmount ] = useState(`${totalADAInCirculation * value}`)

  useEffect(() => {
    if (value < minValue) onChange(minValue)
  }, [ minValue ])

  useEffect(() => {
    const amount = parseFloat(adaAmount)
    if (!amount || isNaN(amount) || amount < 0) {
      onChange(0)
    } else {
      onChange(amount / totalADAInCirculation)
    }
  }, [ adaAmount ])

  const saturationPointOnClick = (e) => {
    e.preventDefault()
    onChange(1 / totalStakePools)
    setADAAmount(1 / totalStakePools * totalADAInCirculation)
  }

  return (
    <Container>
      <FormControl fullWidth>
        <InputLabel shrink>
          {label} ({normalizeLargeNumber(value * 100, 6)}%)
          <Typography
            color={saturated ? 'error' : 'inherit'}
            component='span'
          >
            <Box component='span' display='block' maxWidth='25rem' margin='0 auto'>
              <TextFieldInput
                value={adaAmount}
                type='number'
                min={0}
                fullWidth
                onChange={(e) => setADAAmount(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      {adaSymbol}
                    </InputAdornment>
                  )
                }}
              />
            </Box>
            <SaturationPoint onClick={saturationPointOnClick} component='span' display='block'>
              {saturationLabel}
            </SaturationPoint>
          </Typography>
        </InputLabel>
        <Slider
          value={Math.min(Math.sqrt(value), Math.sqrt(0.3))}
          min={0}
          max={Math.sqrt(0.02)}
          step={0.001}
          onChange={(_, v) => {
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
            setADAAmount(newValue * totalADAInCirculation)
          }}
          marks={[
            {
              value: 0,
              label: '0%'
            },
            {
              value: Math.sqrt(0.001),
              label: '0.1%'
            },
            {
              value: Math.sqrt(0.002),
              label: '0.2%'
            },
            {
              value: Math.sqrt(0.005),
              label: '0.5%'
            },
            {
              value: Math.sqrt(0.01),
              label: '1%'
            },
            {
              value: Math.sqrt(0.015),
              label: '1.5%'
            },
            {
              value: Math.sqrt(0.02),
              label: '2%'
            }
          ]}
        />
        <FormHelperText>
          {helperText}
        </FormHelperText>
      </FormControl>
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
  saturationLabel: PropTypes.node.isRequired
}

export default StakePoolControl
