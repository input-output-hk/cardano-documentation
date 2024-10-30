import React from 'react'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import {
  ControlsContainer,
  CalculatorControlsInputLabel,
  StyledSlider,
  StyledFormHelperText,
} from '../../SharedComponents'

const TotalStakePools = ({ value, label, onChange }) => (
  <ControlsContainer>
    <FormControl fullWidth>
      <CalculatorControlsInputLabel>
        {label} ({value})
      </CalculatorControlsInputLabel>
      <StyledSlider
        value={value}
        min={100}
        max={1000}
        step={1}
        onChange={(_, v) => {
          if (v === value) return
          onChange(v)
        }}
        marks={[
          {
            value: 100,
            label: '100',
          },
          {
            value: 500,
            label: '500',
          },
          {
            value: 1000,
            label: '1000',
          },
        ]}
      />
      <StyledFormHelperText>LABEL</StyledFormHelperText>
    </FormControl>
  </ControlsContainer>
)

TotalStakePools.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default TotalStakePools
