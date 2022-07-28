import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FormControl from '@material-ui/core/FormControl'
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

const ParticipationRate = ({ value, label, onChange, helperText, totalADAInCirculation, adaSymbol, normalizeLargeNumber }) => (
  <Container>
    <FormControl fullWidth>
      <InputLabel shrink>
        {label} ({Math.round(value * 100)}%)
        <span>{adaSymbol} {normalizeLargeNumber(Math.round(totalADAInCirculation * value))}</span>
      </InputLabel>
      <Slider
        value={value}
        min={0.2}
        max={1}
        step={0.01}
        onChange={(_, v) => {
          if (v === value) return
          onChange(v)
        }}
        marks={[
          {
            value: 0.2,
            label: '20%'
          },
          {
            value: 1,
            label: '100%'
          }
        ]}
      />
      <FormHelperText>
        {helperText}
      </FormHelperText>
    </FormControl>
  </Container>
)

ParticipationRate.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  normalizeLargeNumber: PropTypes.func.isRequired,
  helperText: PropTypes.string.isRequired,
  totalADAInCirculation: PropTypes.number.isRequired,
  adaSymbol: PropTypes.node.isRequired
}

export default ParticipationRate
