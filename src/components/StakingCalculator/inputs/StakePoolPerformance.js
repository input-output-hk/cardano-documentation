import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FormControl from '@material-ui/core/FormControl'
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

const StakePoolPerformance = ({ value, label, onChange, helperText }) => (
  <Container>
    <FormControl fullWidth>
      <InputLabel shrink>
        {label} ({Math.round(value * 100)}%)
      </InputLabel>
      <Slider
        value={value}
        min={0}
        max={1}
        step={0.01}
        onChange={(_, v) => {
          if (v === value) return
          onChange(v)
        }}
        marks={[
          {
            value: 0,
            label: '0%'
          },
          {
            value: 1,
            label: '100%'
          }
        ]}
      />
      <FormHelperText>
        {helperText}
      </FormHelperText>
    </FormControl>
  </Container>
)

StakePoolPerformance.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  helperText: PropTypes.string.isRequired
}

export default StakePoolPerformance
