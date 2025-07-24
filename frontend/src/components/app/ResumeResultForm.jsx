
import styled from 'styled-components'


const AnalysisResultFormBlock = styled.div`
  height: 100%;
  width: 100%;
  & > div {
    text-align: center;
  }
  .title {
    font-weight: var(--weight-bold); 
    font-size: 30px;
    margin: 3% 0 1% 0;
  }

  .description { 
    color: var(--sub-color);
  }

  .etcBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 55%;
    text-align: left;
    font-size: 14px;
  }

  .keyword, .summary {
    border: 1px solid var(--light-blue);
    padding: 1%;
    width: 61%;
    height: 20%;
  }

  .keyword {
    margin: 3% 0;
  }
`;

const ScoreBox = styled.div`
  width: 100%; 
  height: 20%;
  display: flex;
  justify-content: center;
  & > div {
    border: 1px solid black; 
  }
  .box {
    border: 1px solid var(--light-blue);
    padding: 1%;
    width: 17%;
    height: 70%;
    border-radius: 10px;
    margin-top: 2%;
    text-align: left;
    font-size: 14px;
  }
  .word {
    margin-right:3%;
    margin-left:3%;
  }

  
`;





const ResumeResultForm  = () => { 
  return (
    <AnalysisResultFormBlock>
      <div className='title'>Resume Analysis Result </div>
      <div className="description">We evaluated your cover letter for sentiment, structure, and keyword relevance. <br />
        See what you did well and where you can improve to better present yourself to employers.</div>

        <ScoreBox>
    
          <div className="sentence box">
            <div>Sentence Count</div>
          </div>

          <div className="word box">
            <div>Word Count</div>
          </div>
          <div className="emotional box">

            <div>Emotional Score</div>
          </div>
        </ScoreBox>
      <div className='etcBox'>
        <div className="keyword">
          <div>Included Job-Relevant Keywords</div>

        </div>

        <div className="summary">

          <div>Feedback Summaray</div>
          <div className='summary_text'></div>
        </div>
      </div>
    </AnalysisResultFormBlock>
  )
  

}

export default ResumeResultForm;