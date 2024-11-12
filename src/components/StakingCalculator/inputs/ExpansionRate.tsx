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
  TextFieldWrapper,
} from '../../SharedComponents'

const ExpansionRate = ({ value, label, onChange, helperText }) => {
  const [textValue, setTextValue] = useState(`${value * 100}`)

  const textOnChange = (e) => {
    setTextValue(e.target.value)
    const floatValue = parseFloat(e.target.value)
    if (!isNaN(floatValue) && floatValue > 0) {
      onChange(Math.min(floatValue / 100, 0.02))
    }
  }

  return (
    <ControlsContainerWithInput>
      <StyledFormControl>
        <InputLabel>{label}</InputLabel>
        <TextFieldSliderWrapper>
          <TextFieldWrapper>
            <AdvancedOptionsTextField
              value={textValue}
              onChange={textOnChange}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                disableUnderline: true,
              }}
            />
          </TextFieldWrapper>
          <StyledSlider
            value={value}
            min={0}
            max={0.02}
            step={0.00001}
            onChange={(_, v: number | any) => {
              if (v === value) return
              onChange(v)
              setTextValue(`${Math.round(v * 1e5) / 1e3}`)
            }}
            marks={[
              {
                value: 0,
                label: '0%',
              },
              {
                value: 0.02,
                label: '2%',
              },
            ]}
          />
        </TextFieldSliderWrapper>
        <span>{helperText}</span>
      </StyledFormControl>
    </ControlsContainerWithInput>
  )
}

ExpansionRate.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  helperText: PropTypes.string.isRequired,
}

export default ExpansionRate
