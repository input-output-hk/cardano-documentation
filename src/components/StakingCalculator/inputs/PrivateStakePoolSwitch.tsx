import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Switch from '@material-ui/core/Switch'

const StyledFormGroup = styled(FormGroup)`
  span {
    font-family: 'Chivo';
  }

  p {
    font-family: 'Chivo';
    font-size: 0.813rem;
    line-height: 1.375rem;
  }
`
const StyledFormHelperText = styled(FormHelperText)`
  color: var(--ifm-font-color-base);
`

const PrivateStakePoolSwitch = ({ checked, onChange, label, helperText }) => (
  <StyledFormGroup row>
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          color="primary"
        />
      }
      label={label}
    />
    {helperText && <StyledFormHelperText>{helperText}</StyledFormHelperText>}
  </StyledFormGroup>
)

PrivateStakePoolSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string.isRequired,
}

export default PrivateStakePoolSwitch
