import React from 'react'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import {
  ControlsContainer,
  CalculatorControlsInputLabel,
  StyledSlider,
  StyledFormHelperText,
} from '../../SharedComponents'

const ParticipationRate = ({
  value,
  label,
  onChange,
  helperText,
  totalADAInCirculation,
  adaSymbol,
  normalizeLargeNumber,
}) => (
  <ControlsContainer>
    <FormControl fullWidth>
      <CalculatorControlsInputLabel>
        {label} ({Math.round(value * 100)}%)
        <span>
          {adaSymbol}{' '}
          {normalizeLargeNumber(Math.round(totalADAInCirculation * value))}
        </span>
      </CalculatorControlsInputLabel>
      <StyledSlider
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
            label: '20%',
          },
          {
            value: 1,
            label: '100%',
          },
        ]}
      />
      <StyledFormHelperText>{helperText}</StyledFormHelperText>
    </FormControl>
  </ControlsContainer>
)

ParticipationRate.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  normalizeLargeNumber: PropTypes.func.isRequired,
  helperText: PropTypes.string.isRequired,
  totalADAInCirculation: PropTypes.number.isRequired,
  adaSymbol: PropTypes.node.isRequired,
}

export default ParticipationRate
