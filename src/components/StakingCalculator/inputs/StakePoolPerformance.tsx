import React from 'react'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import Slider from '@material-ui/core/Slider'
import {
  ControlsContainer,
  CalculatorControlsInputLabel,
  StyledFormHelperText,
  StyledSlider,
} from '../../SharedComponents'

const StakePoolPerformance = ({ value, label, onChange, helperText }) => (
  <ControlsContainer>
    <FormControl fullWidth>
      <CalculatorControlsInputLabel>
        {label} ({Math.round(value * 100)}%)
      </CalculatorControlsInputLabel>
      <StyledSlider
        value={value}
        min={0}
        max={1}
        step={0.01}
        onChange={(_, v) => {
          if (v === value) return
          onChange(v)
        }}
        marks={[
          {
            value: 0,
            label: '0%',
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

StakePoolPerformance.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  helperText: PropTypes.string.isRequired,
}

export default StakePoolPerformance
