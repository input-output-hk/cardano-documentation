import React from 'react'
import PropTypes from 'prop-types'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'

const ADAAmount = ({ value, onChange, label, helperText, adaSymbol }) => (
  <TextField
    label={label}
    helperText={helperText}
    value={`${value}`}
    type='number'
    min={0}
    fullWidth
    onChange={(e) => onChange(e.target.value)}
    InputProps={{
      startAdornment: (
        <InputAdornment position='start'>
          {adaSymbol}
        </InputAdornment>
      )
    }}
  />
)

ADAAmount.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  adaSymbol: PropTypes.node.isRequired
}

export default ADAAmount
