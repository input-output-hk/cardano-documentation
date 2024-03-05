import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

const TransactionFeesPerEpoch = ({ value, onChange, label, helperText, adaSymbol }) => (
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

TransactionFeesPerEpoch.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  adaSymbol: PropTypes.node.isRequired
}

export default TransactionFeesPerEpoch
