import { Link, useNavigate } from 'react-router-dom';
import * as a from '../../lib/styled-components/StyledAuth';
import Button from '../common/Button';
import { useState } from 'react';
import { setRegisterUser } from '../../service/UserApi';

const JoinForm = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { name, email, password } = inputs

  const handleChange = (e) => { 
    const {name, value} = e.target
    setInputs({
      ...inputs, 
      [name]: value
    })
  }

  const handleRegister = () => {
    setRegisterUser(inputs)
      .then((res) => {
        setInputs('')
        navigate('/home')
      }).catch((err) => console.error(err))
    }

  return (
      <a.LoginBox>
          <div className='form'>
            <div className='title'>AI RESUME</div>
            <p>Let’s create your account to get started.</p>

          <div className="join_input">
          <div className='login-option'>Name</div>
            <a.StyledInput type='text' name='name' onChange={handleChange}/>

            <div className='login-option'>Email Address</div>
            <a.StyledInput type='text' name='email' onChange={handleChange} />

            <div className='login-option pw'>Password</div>
            <a.StyledInput type='password' name='password' onChange={handleChange}/>
          
            <div className='login-option pw'>Password Confirm</div>
            <a.StyledInput type='password' name='passwordConfirm' onChange={handleChange}/>
          </div>
            
            <Button className='btn-login' onClick={() => handleRegister()}>Sign up</Button>
            <a.Footer>
              <div className='join_msg'>
                By clicking “Sign Up” you agree to <br /> 
                ________”s Terms and <br/> 
                Conditions and Privacy Policy
              </div>
            </a.Footer>
              <Link to='/'>Login</Link>
          </div>
      </a.LoginBox>
  )
}

export default JoinForm