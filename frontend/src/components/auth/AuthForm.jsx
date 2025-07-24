import img1 from '../../lib/img/login.jpg';
import * as a from '../../lib/styled-components/StyledAuth';
import JoinForm from './JoinForm';
import LoginForm from './LoginForm';

const AuthForm = ({type}) => {

  return (
    <a.AuthFormBlock>
      <a.FormBlock>
        { type === 'login' ? 
          <LoginForm /> : (<JoinForm />)
        }
      </a.FormBlock>
        
      <a.ImgBox>
        <img src={img1} alt='로그인페이지'/>
      </a.ImgBox>
    </a.AuthFormBlock>
  )
}

export default AuthForm