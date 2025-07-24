import { Link, useNavigate } from "react-router-dom";
import * as a from "../../lib/styled-components/StyledAuth";
import Button from "../common/Button";
import { useState } from "react";
import { login } from "../../service/UserApi";

const LoginForm = () => { 
  const [inputs, setInputs] = useState({
    email: '',
    password: '', 
  })

  const {email, password} = inputs;

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const {name, value} = e.target
    setInputs({
      ...inputs,
      [name]: value
    })
    console.log(inputs)
  }

  const handleLogin = () => {
    console.log('login')
    login(inputs.email, inputs.password) 
      .then((res) => {
        console.log(res.data)
        navigate('/home')
      }).catch((err) => {
        console.error('연결 실패 >>>>>>>' + err)
      })
    }

  return (
    <a.LoginBox>
      <Link to='/home'>홈으로</Link>
      <div className="form">
        <div className="title">AI RESUME</div>
        <p>Connect your resume to opportunities</p>
        <div className="btn_OAuth">
          <a.StyledButton>Sign in With Google</a.StyledButton>
          <a.StyledButton>Sign in With Google</a.StyledButton>
        </div>

        <div className="or">OR</div>
        <div className="login-option">Email</div>
        <a.StyledInput type="text" name="email" onChange={handleChange}/>

        <div className="login-option pw">Password</div>
        <a.StyledInput type="password" name="password" onChange={handleChange}/>

        <Button className="btn-login" onClick={() => handleLogin()}>Sign in</Button>

        <a.Footer>
          <div className="find-pw">Forgot Password?</div>
          <span>
            Don't have an account?
            <span className="signUp">
              <a.StyledLink to="/join"> Sign up</a.StyledLink>
            </span>
          </span>
        </a.Footer>
      </div>
    </a.LoginBox>
  );
};

export default LoginForm;
