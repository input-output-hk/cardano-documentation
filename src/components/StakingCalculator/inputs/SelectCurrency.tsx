import React from 'react'
import PropTypes from 'prop-types'
import { StyledTextField, TextFieldWrapper } from '../../SharedComponents'
import ChevronDown from '../../icons/ChevronDown.svg'
import { InputAdornment } from '@material-ui/core'

const SelectCurrency = ({ value, onChange, label, helperText, currencies }) => (
  <TextFieldWrapper>
    <span>{label}</span>
    <StyledTextField
      select
      value={value.key}
      onChange={(e) => {
        const currency = currencies
          .filter((currency) => currency.key === e.target.value)
          .shift()
        onChange(currency)
      }}
      fullWidth
      SelectProps={{
        native: true,
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment
            position="end"
            style={{ position: 'absolute', right: 0, zIndex: -1 }}
          >
            <ChevronDown />
          </InputAdornment>
        ),
        disableUnderline: true,
      }}
    >
      {currencies.map((currency) => (
        <option key={currency.key} value={currency.key}>
          {currency.key}
        </option>
      ))}
    </StyledTextField>
    <span>{helperText}</span>
  </TextFieldWrapper>
)

SelectCurrency.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  currencies: PropTypes.array.isRequired,
}

export default SelectCurrency
