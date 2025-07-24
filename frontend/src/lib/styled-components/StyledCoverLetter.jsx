import styled from 'styled-components'

export const CoverLetterResultFormBlock = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid blue;
  .titleBox {
    border: 1px solid purple;
    width: 100%;
    height: 20%;
  }
  .title {
    font-weight: var(--weight-bold); 
    font-size: 30px;
    margin: 3% 0 1% 0;
    text-align: center;
  }
  .text { 
    color: var(--sub-color);
    text-align: center;
  }
`;

export const ScoreBox = styled.div`
  width: 100%; 
  height: 25%;
  display: flex;
  justify-content: center;
  & > div {
    border: 1px solid black; 
  }
  .box {
    border: 1px solid var(--light-blue);
    padding: 1%;
    width: 18%;
    height: 70%;
    border-radius: 10px;
    text-align: left;
    font-size: 14px;
    color: var(--primary-color);
  }
  .box2 {
    margin-right: 2%;
    margin-left: 2%;
  }
`;

export const LayoutBox = styled.div`
  display: flex;
  width: 100%;
  height: 55%;
  .etcBox1 {
    width: 60.1%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .skill, .history, .pointImprove {
    border: 1px solid var(--light-blue);
    padding: 2%;
    border-radius: 10px;
    font-size: 14px;
  }

  .skill, .history {
    width: 66%;
    height: 25%;
  }

  .skill_title {
    font-weight: var(--weight-semi-bold);
    font-size: 16px;
    margin-bottom: 1%;
  }

  .history {
    margin: 3% 0;
  }

  .etcBox2 {
    border: 1px solid purple;
    width: 39%;
  }

  .pointImprove {
    margin-left: 5.5%;
    width: 45.5%;
    height: 68%;
  }
`;


