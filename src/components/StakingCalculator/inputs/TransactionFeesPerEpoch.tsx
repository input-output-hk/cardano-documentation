import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import { TextFieldWrapper, StyledTextField } from '../../SharedComponents'

const TransactionFeesPerEpoch = ({
  value,
  onChange,
  label,
  helperText,
  adaSymbol,
}) => (
  <TextFieldWrapper>
    <span>{label}</span>
    <StyledTextField
      value={`${value}`}
      type="number"
      fullWidth
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{adaSymbol}</InputAdornment>
        ),
        disableUnderline: true,
      }}
    />{' '}
    <span>{helperText}</span>
  </TextFieldWrapper>
)

TransactionFeesPerEpoch.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  adaSymbol: PropTypes.node.isRequired,
}

export default TransactionFeesPerEpoch
