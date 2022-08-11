import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

const SelectCurrency = ({ value, onChange, label, helperText, currencies }) => (
  <TextField
    select
    label={label}
    value={value.key}
    onChange={(e) => {
      const currency = currencies.filter(currency => currency.key === e.target.value).shift()
      onChange(currency)
    }}
    fullWidth
    SelectProps={{
      native: true
    }}
    helperText={helperText}
  >
    {currencies.map(currency => (
      <option key={currency.key} value={currency.key}>
        {currency.key}
      </option>
    ))}
  </TextField>
)

SelectCurrency.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  currencies: PropTypes.array.isRequired
}

export default SelectCurrency
