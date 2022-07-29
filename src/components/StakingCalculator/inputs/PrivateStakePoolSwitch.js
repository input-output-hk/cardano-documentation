import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Switch from '@material-ui/core/Switch'

const StyledFormGroup = styled(FormGroup)`
  .MuiFormControlLabel-root {
    margin-left: 0;
  }
`

const PrivateStakePoolSwitch = ({ checked, onChange, label, helperText }) => (
  <StyledFormGroup row>
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          color='primary'
        />
      }
      label={label}
    />
    {helperText &&
      <FormHelperText>
        {helperText}
      </FormHelperText>
    }
  </StyledFormGroup>
)

PrivateStakePoolSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string.isRequired
}

export default PrivateStakePoolSwitch
