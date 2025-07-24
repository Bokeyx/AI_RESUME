import star from "../../lib/img/icon/star2s.PNG";
import bulb from "../../lib/img/icon/bulb.png";
import * as s from '../../lib/styled-components/styledSubmit';
import { useState } from "react";
import { getEssaysList } from "../../service/essaysApi";

const SubmitForm = () => {

  const [essaysList, setEssaysList] = useState([]); 
  
    // useEffect(() => {
    
    // }, [])

    const getEssay = () => {
      getEssaysList()
        .then((res) => {
          setEssaysList(res.data)
          console.log(res.data)
        }).catch ((err) => {
          console.error(err)
        })
    }
    
    
  return (  
    <s.SubmitFormBlock>

      <div className="notice">
        <div className="main-title">Submit Your Documents</div>
        <div className="sub-title">Paste your resume and cover letter content below to get started with out analysistools.</div>
      </div>

      <div className="deco">
          <div className="deco_resume">
            <img src={star} alt="img" />
            <div className="textBox">
              <div className="deco_title">Predict Your Role</div>
              <div className="text">See which job categories your resume best aligns with based on AI
                    analysis</div>
            </div>
        </div>

          <div className="deco_coverletter">
            <img src={bulb} alt="img" />
            <div className="textBox">
              <div className="deco_title">Refine Your Writing</div>
              <div className="text">Get feedback on your cover letter’s tone, keywords, and
                    effectiveness.</div>
          </div>
        </div>
      </div>

      <div className="form">

        <s.Resume>
          <div className="resume_title content_title">Resume Content</div>
          <div className="description">Paste your full resume text here for analysis. Ensure all relevant sections
            like experience, education, and skills are included</div>
            <textarea name="" id="" placeholder="Paste your resume text here..."></textarea>
            <s.StyledButton>Predict Job Category</s.StyledButton>
        </s.Resume>

        <s.CoverLetter>
          <div className="resume_title content_title">Cover Letter (Optional)</div>
          <div className="description">Paste your full resume text here for analysis. Ensure all relevant sections
            like experience, education, and skills are included</div>
          <textarea name="" id="" placeholder="Paste your resume text here..."></textarea>
          <s.ColorButton>Analyze Cover Letter</s.ColorButton>
        </s.CoverLetter>
      </div>
      
    </s.SubmitFormBlock>
  )
}

export default SubmitForm;