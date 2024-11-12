import React from 'react'
import PropTypes from 'prop-types'
import InputAdornment from '@material-ui/core/InputAdornment'
import { TextFieldWrapper, StyledTextField } from '../../SharedComponents'

const ADAAmount = ({ value, onChange, label, helperText, adaSymbol }) => (
  <TextFieldWrapper>
    <span>{label}</span>
    <StyledTextField
      value={`${value}`}
      type="number"
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{adaSymbol}</InputAdornment>
        ),
        disableUnderline: true,
      }}
    />
    <span>{helperText}</span>
  </TextFieldWrapper>
)

ADAAmount.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  adaSymbol: PropTypes.node.isRequired,
}

export default ADAAmount
