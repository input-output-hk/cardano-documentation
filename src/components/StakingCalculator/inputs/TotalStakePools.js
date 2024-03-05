import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FormControl from '@material-ui/core/FormControl'
import Slider from '@material-ui/core/Slider'

const Container = styled.div`
  text-align: center;
`

const InputLabel = styled.label`
  font-size: 1.2rem;
`

const TotalStakePools = ({ value, label, onChange }) => (
  <Container>
    <FormControl fullWidth>
      <InputLabel shrink>
        {label} ({value})
      </InputLabel>
      <Slider
        value={value}
        min={100}
        max={1000}
        step={1}
        onChange={(_, v) => {
          if (v === value) return
          onChange(v)
        }}
        marks={[
          {
            value: 100,
            label: '100'
          },
          {
            value: 500,
            label: '500'
          },
          {
            value: 1000,
            label: '1000'
          }
        ]}
      />
    </FormControl>
  </Container>
)

TotalStakePools.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default TotalStakePools
