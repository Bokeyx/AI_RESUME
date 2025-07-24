import styled from 'styled-components'
import Button from '../../components/common/Button';

export const SubmitFormBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .notice {
    width: 100%;
    padding: 1%;
    text-align: center;
  }
  .main-title {
    font-weight: var(--weight-bold);
    font-size: 30px;
  }

  .sub-title {
    margin:1% 0;
  }

  .deco { 
    display: flex;
    width: 100%;
    padding: 0% 1% 0% 0;
    justify-content: center;
  }
  .deco img {
    background: var(--primary-color);
    width :25px;
    height: 25px;
    padding:4px;
    margin: 1% 3% 1% 1%;
    border-radius: 5px;
  }

  .deco_resume {
    margin-right: 1%;
  }
  .deco_resume, .deco_coverletter {
    background: var(--light-blue);
    display: flex;
    width: 31%;
    border-radius: 10px;
    padding: 1.5%;
    .text {
      color: var(--sky-blue);
      font-size: 15px;
      margin-top: 1%;
    }
    .deco_title {
      font-weight: var(--weight-semi-bold);
    }
  }
      
    .form {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      margin-top: 1.5%;
      .content_title {
        font-weight: var(--weight-semi-bold);
        font-size: 20px;
        margin-bottom: 7px;
      }
      .description {
        color: var(--sub-color);
      }
  }
  textarea {
    width: 96%;
    height: 60%;
    resize: none;
    border: 1px solid var(--sub-color);
    margin-top: 3%;
    border-radius: 5px;
    padding: 2%;
  }
`;


export const Resume = styled.div`
  border: 1px solid var(--sub-color);
  width: 30%;
  height: 70%;
  border-radius: 5px;
  padding: 2%;
  margin-right: 1%
  `; 
  
  export const CoverLetter = styled.div`
  border: 1px solid var(--sub-color);
  border-radius: 5px;
  width: 30%;
  height: 70%;
  padding: 2%;
`; 


export const StyledButton = styled(Button)`
  margin-top: 5%;
`

export const ColorButton = styled(Button)`
  background: var(--light-blue);
  color: var(--primary-color);
  margin-top: 5%;
`;
