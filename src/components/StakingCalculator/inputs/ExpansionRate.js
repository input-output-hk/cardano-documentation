import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText'
import Slider from '@material-ui/core/Slider'

const Container = styled.div`
  text-align: center;

  .MuiFormHelperText-root {
    text-align: center;
  }
`

const InputLabel = styled.label`
  font-size: 1.2rem;
`

const TextFieldInput = styled(TextField)`
  input {
    text-align: center;
  }
`

const ExpansionRate = ({ value, label, onChange, helperText }) => {
  const [ textValue, setTextValue ] = useState(`${value * 100}`)

  const textOnChange = (e) => {
    setTextValue(e.target.value)
    const floatValue = parseFloat(e.target.value)
    if (!isNaN(floatValue) && floatValue > 0) {
      onChange(Math.min(floatValue / 100, 0.02))
    }
  }

  return (
    <Container>
      <FormControl fullWidth>
        <InputLabel shrink>
          {label}
          <Box component='span' display='block' margin='0 auto' maxWidth='8rem'>
            <TextFieldInput
              value={textValue}
              onChange={textOnChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='start'>
                    %
                  </InputAdornment>
                )
              }}
            />
          </Box>
        </InputLabel>
        <Slider
          value={value}
          min={0}
          max={0.02}
          step={0.00001}
          onChange={(_, v) => {
            if (v === value) return
            onChange(v)
            setTextValue(Math.round(v * 1e5) / 1e3)
          }}
          marks={[
            {
              value: 0,
              label: '0%'
            },
            {
              value: 0.02,
              label: '2%'
            }
          ]}
        />
        <FormHelperText>
          {helperText}
        </FormHelperText>
      </FormControl>
    </Container>
  )
}

ExpansionRate.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  helperText: PropTypes.string.isRequired
}

export default ExpansionRate
