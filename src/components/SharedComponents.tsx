import { Slider, FormControl, TextField } from '@material-ui/core'
import styled from 'styled-components'

export const CopyInputContainer = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 1rem;
  margin-top: 0.25rem;
  border: 1px solid var(--text-field-content-color) !important;
  border-radius: 4px;
`

export const CopyInput = styled.input`
  display: flex;
  padding: 0.5rem;
  width: 100%;
  max-width: calc(100% - 2.5rem);
  background-color: transparent;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  border-radius: 4px;
  border: none;
  text-overflow: ellipsis;

  font-style: normal;
  font-weight: 400;
  line-height: 1.375rem;
`

export const Copy = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  background: none;
  border: none;

  :hover {
    cursor: pointer;
  }

  :active {
    transform: scale(0.8);
  }
`

export const StyledSlider = styled(Slider)`
  .MuiSlider-markLabel {
    font-family: 'Chivo';
    color: var(--slider-points-color);
    font-size: 0.813rem;

    @media (max-width: 767px) {
      font-size: 0.7rem;
    }
  }

  span {
    color: var(--ifm-color-primary);
  }
`

export const StyledFormHelperText = styled.span`
  color: var(--controls-text-color);
  text-align: center !important;
  font-family: 'Chivo';
  font-size: 0.813rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.375rem;
  margin-top: 0.625rem;
`

export const ControlsContainerWithInput = styled.div`
  text-align: center;
  background-color: var(--controls-background-color);
  border-radius: 4px;
  padding: 1.5rem;
  aspect-ratio: 1 / 1;
`

export const ControlsContainer = styled(ControlsContainerWithInput)`
  div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`

export const CalculatorControlsInputLabel = styled.label`
  font-size: 1rem;
`

export const StyledFormControl = styled(FormControl)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const InputLabel = styled.label`
  font-size: 1rem;
  gap: 2rem;
  display: flex;
  flex-direction: column;
`

export const TextFieldInput = styled(TextField)`
  input {
    text-align: center;
  }
`

export const TextFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  span {
    margin-left: 1px;
    font-size: 0.813rem;
  }

  p {
    margin: 0;
  }
`

export const StyledTextField = styled(TextField)`
  padding: 1rem !important;
  border-radius: 0.25rem !important;
  border: 1px solid var(--text-field-content-color) !important;
  margin: 0.25rem 0 !important;

  &:focus-within {
    border: 2px solid var(--ifm-link-color);
  }

  input,
  select {
    padding: 0;
  }

  .MuiInputAdornment-root,
  .MuiTypography-root,
  input,
  select {
    color: var(--text-field-content-color) !important;
  }

  select:focus {
    background-color: transparent !important;
  }

  .MuiInputAdornment-root svg {
    fill: var(--text-field-content-color) !important;
  }

  select:focus {
    background-color: #fff;
  }

  .MuiSelect-icon {
    display: none;
  }
`

export const AdvancedOptionsTextField = styled(StyledTextField)`
  div {
    flex-basis: auto !important;
  }
`

export const TextFieldSliderWrapper = styled.div`
  display: flex;
  flex-direction: column;

  flex-basis: auto !important;
  gap: 1rem;
`
