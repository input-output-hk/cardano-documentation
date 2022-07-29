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

const InfluenceFactor = ({ value, label, onChange, helperText }) => (
  <Container>
    <FormControl fullWidth>
      <InputLabel shrink>
        {label} {value}
      </InputLabel>
      <Slider
        value={value}
        min={0}
        max={10}
        step={0.1}
        onChange={(_, v) => {
          if (v === value) return
          onChange(v)
        }}
        marks={[
          {
            value: 0,
            label: '0'
          },
          {
            value: 2,
            label: '2'
          },
          {
            value: 4,
            label: '4'
          },
          {
            value: 6,
            label: '6'
          },
          {
            value: 8,
            label: '8'
          },
          {
            value: 10,
            label: '10'
          }
        ]}
      />
      <FormHelperText>
        {helperText}
      </FormHelperText>
    </FormControl>
  </Container>
)

InfluenceFactor.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  helperText: PropTypes.string.isRequired
}

export default InfluenceFactor
