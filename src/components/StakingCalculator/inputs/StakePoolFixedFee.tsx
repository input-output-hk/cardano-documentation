import React from 'react'

import PropTypes from 'prop-types'
import InputAdornment from '@material-ui/core/InputAdornment'

import { TextFieldWrapper, StyledTextField } from '../../SharedComponents'

const getValue = (value) => {
  if (value.indexOf('.') > -1) {
    const [n, decimals] = value.split('.')
    return `${n}.${decimals.substring(0, 8)}`
  } else {
    return value
  }
}

const StakePoolFixedFee = ({ value, onChange, label, helperText, symbol }) => (
  <TextFieldWrapper>
    <span>{label}</span>
    <StyledTextField
      value={getValue(value)}
      type="number"
      fullWidth
      onChange={(e) => {
        if (e.target.value.match(/^([\d]+|([\d]+)?\.[\d]{0,8})?$/)) {
          onChange(e.target.value)
        }
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{symbol}</InputAdornment>
        ),
        disableUnderline: true,
      }}
    />
    <span>{helperText}</span>
  </TextFieldWrapper>
)

StakePoolFixedFee.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.node,
  symbol: PropTypes.node.isRequired,
}

export default StakePoolFixedFee
