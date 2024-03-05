import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'

const Container = styled.div`
  p {
    margin: 0;
  }
`

const getValue = (value) => {
  if (value.indexOf('.') > -1) {
    const [ n, decimals ] = value.split('.')
    return `${n}.${decimals.substring(0, 8)}`
  } else {
    return value
  }
}

const ExchangeRate = ({ value, onChange, label, helperText, symbol }) => (
  <Container>
    <TextField
      label={label}
      helperText={helperText}
      FormHelperTextProps={{
        component: 'div'
      }}
      value={getValue(`${value}`)}
      type='number'
      min={0}
      fullWidth
      onChange={(e) => {
        if (e.target.value.match(/^([\d]+|([\d]+)?\.[\d]{0,8})?$/)) {
          onChange(e.target.value)
        }
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            {symbol}
          </InputAdornment>
        )
      }}
    />
  </Container>
)

ExchangeRate.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.node,
  symbol: PropTypes.node.isRequired
}

export default ExchangeRate
