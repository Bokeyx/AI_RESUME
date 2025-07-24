import * as c from '../../lib/styled-components/StyledCoverLetter'

const CoverLetterResultForm  = () => { 

  return (
    <c.CoverLetterResultFormBlock>
      <div className="titleBox">
        <div className='title'>Cover Letter Analysis Result </div>
        <div className="text">We evaluated your cover letter for sentiment, structure, and keyword relevance. <br />
          See what you did well and where you can improve to better present yourself to employers.</div>
      </div>
      
        <c.ScoreBox>
          <div className="box">
            <div>Predicted Job Category</div>
          </div>
          <div className="box2 box">
            <div>Overall Score</div>
          </div>
          <div className="box">
            <div>Match Confidence</div>
          </div>
        </c.ScoreBox>

        <c.LayoutBox>
          <div className='etcBox1'>
            <div className="skill">
              <div className='skill_title'>Tech Stack</div>
              <div>Extract Skills</div>
            </div>

            <div className="history">
              <div>History Overview</div>
            </div>
          </div>

          <div className="etcBox2">
            <div className='pointImprove'>
            <div>Points Improve</div>
          </div>
        </div>
      </c.LayoutBox>
    </c.CoverLetterResultFormBlock>
  )
}

export default CoverLetterResultForm