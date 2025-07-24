import styled from 'styled-components'
import { Link } from 'react-router-dom';

export const AuthFormBlock =  styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const FormBlock = styled.div`
  border: 1px solid purple;
  width: 50%;
  height:100%;
  display:flex;
`;

export const LoginBox = styled.div`
  display: flex;
  width: 100%;
  p {
    margin-top: 6%;
    margin-bottom: 9%;
  }
  .form {
    border: 1px solid var(--sub-color);
    border-radius: 7px;
    margin:auto;
    height: 70%;
    text-align:center;
    padding: 3%;
    width: 50%;
  }
  .title { 
    font-size:30px;
    font-weight: 800;
  }
  .or { 
    color: var(--sub-color);
    margin-bottom : 5%;
  }

  .or:after {
    content: "";
    width: 100%;
    height: 1px;
    display: block;
    background: var(--sub-color);
    margin: 1% 0 4% 0;
    }

  .login-option { 
    text-align: left;
    margin-bottom: 5px;
    font-weight: 500;
  }

  .pw {
    margin-top: 10px;
  }

  .btn-login {
    margin-top: 4%;
  }
  .btn_OAuth {
    display: flex;
    flex-direction: column;
    margin-top: 2%;
    margin-bottom: 4%;
  }
  .btn_OAuth > button {
    margin-bottom: 3%;
  }

  .join_inputv > input {
    line-height: 3;
  }
`;

export const StyledInput = styled.input`
  border-style: solid;
  border-width: 1px;
  border-color: var(--sub-color);
  width: 100%;
  border-radius: 5px;
  height: 35px;
  margin-bottom: 5%;
`;

export const StyledButton = styled.button`
  background: transparent;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  border-color: var(--sub-color);
  height: 35px;
`;

export const StyledLink = styled(Link)`
  color: var(--primary-color);
  text-decoration: none;
`;

export const Footer = styled.div`
  margin: 3% 0;
  .find-pw { 
    text-align: left;
    color: var(--primary-color);
    font-weight: var(--weight-semi-bold);
    margin-bottom: 12%;
  }
  .signUp {
    color: var(--primary-color);
    font-weight: var(--weight-semi-bold);
  }
  .join_msg {
    color: var(--light-gray);
    margin-top: 5%;
    font-size: 14px;
  }
`;

export const ImgBox = styled.div`
  img {
    width:100%;
    height: 100%;
    object-fit: fill;
  }
`;

export const JoinBlock = styled.div`

  width: 50%;
`;
