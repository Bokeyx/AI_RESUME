import styled from "styled-components"

const StyledButton = styled.button`
  width: 100%;
  border: none;
  border-radius: 5px;
  height: 40px;
  font-size: 17px;
  background: var(--primary-color);
  color: white;
`; 
const Button = props => <StyledButton {...props} />

export default Button;