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

const InfluenceFactor = ({ value, label, onChange, helperText }) => (
  <ControlsContainer>
    <FormControl fullWidth>
      <CalculatorControlsInputLabel>
        {label} {value}
      </CalculatorControlsInputLabel>
      <StyledSlider
        value={value}
        min={0}
        max={10}
        step={0.1}
        onChange={(_, v) => {
          if (v === value) return
          onChange(v)
        }}
        marks={[
          {
            value: 0,
            label: '0',
          },
          {
            value: 2,
            label: '2',
          },
          {
            value: 4,
            label: '4',
          },
          {
            value: 6,
            label: '6',
          },
          {
            value: 8,
            label: '8',
          },
          {
            value: 10,
            label: '10',
          },
        ]}
      />
      <StyledFormHelperText>{helperText}</StyledFormHelperText>
    </FormControl>
  </ControlsContainer>
)

InfluenceFactor.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  helperText: PropTypes.string.isRequired,
}

export default InfluenceFactor
