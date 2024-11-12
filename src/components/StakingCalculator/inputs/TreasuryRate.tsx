import React, { useState } from 'react'
import PropTypes from 'prop-types'
import InputAdornment from '@material-ui/core/InputAdornment'
import Slider from '@material-ui/core/Slider'
import {
  AdvancedOptionsTextField,
  ControlsContainerWithInput,
  InputLabel,
  StyledFormControl,
  StyledSlider,
  TextFieldSliderWrapper,
} from '../../SharedComponents'

const TreasuryRate = ({ value, label, onChange, helperText }) => {
  const [textValue, setTextValue] = useState(`${value * 100}`)

  const textOnChange = (e) => {
    setTextValue(e.target.value)
    const floatValue = parseFloat(e.target.value)
    if (!isNaN(floatValue) && floatValue > 0) {
      onChange(Math.min(floatValue / 100, 1))
    }
  }

  return (
    <ControlsContainerWithInput>
      <StyledFormControl>
        <InputLabel>{label}</InputLabel>
        <TextFieldSliderWrapper>
          <AdvancedOptionsTextField
            value={textValue}
            onChange={textOnChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
              disableUnderline: true,
            }}
          />
          <StyledSlider
            value={value}
            min={0}
            max={1}
            step={0.001}
            onChange={(_, v: number | any) => {
              if (v === value) return
              onChange(v)
              setTextValue(`${Math.round(v * 1000) / 10}`)
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
        </TextFieldSliderWrapper>
        <span>{helperText}</span>
      </StyledFormControl>
    </ControlsContainerWithInput>
  )
}

TreasuryRate.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  helperText: PropTypes.string.isRequired,
}

export default TreasuryRate
