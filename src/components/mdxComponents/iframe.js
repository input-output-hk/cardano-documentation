import styled from '@emotion/styled'

const StyledIframe = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 56.25%;
  ${(props) => props.tall && `padding-top: 80%;`}
  > iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`

const Iframe = (props) => (
  <StyledIframe {...props}>{props.children}</StyledIframe>
)

export default Iframe
