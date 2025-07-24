
import styled from 'styled-components'


const HistoryFormBlock = styled.div`
  height: 100%;
  width: 100%;
  select {
    width: 143px;
    height: 39px;
    border: 1px solid var(--sub-color);
    border-radius: 9px;
  }
  .status {
    margin: 0 2%;
  }
    .types {
      margin-left: 2%;
    }
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
    height: 30%;
    font-size: 14px;
  }

  .search, .table {
    border: 1px solid var(--light-blue);
    padding: 1%;
    width: 61%;
    height: 15%;
    border-radius: 9px;
  }

  .search {
    margin: 3% 0;
  }

  .table {
    .table_header {
      border: 1px solid blue;
      height: 47px;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
`;

const HistoryBox = styled.div`
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
  .analysis {
    margin-right:3%;
    margin-left:3%;
  }
`;

const StyledInput = styled.input`
  border-style: solid;
  border-width: 1px;
  border-color: var(--sub-color);
  width: 50%;
  border-radius: 5px;
  height: 35px;
`;

const HistotyForm  = () => { 
  return (
    <HistoryFormBlock>
      <div className='title'> My Submission History</div>
      <div className="description">We evaluated your cover letter for sentiment, structure, and keyword relevance. <br />
        See what you did well and where you can improve to better present yourself to employers.</div>

        <HistoryBox>
          <div className="box">
            <div>Total Submissions</div>
          </div>

          <div className="analysis box">
            <div>Successful analyses</div>
          </div>

          <div className="box">
            <div>Average Score (Resume)</div>
          </div>
        </HistoryBox>

      <div className='etcBox'>
        <div className="search">
          <StyledInput placeholder='Search submissions...'/>
          <select className='types'>
            <option>All Types</option>
            <option>Resume</option>
            <option>Cover Letter</option>
          </select>
          <select className='status'>
            <option>All Statuses</option>
            <option>Completed</option>
            <option>Processing</option>
            <option>Failed</option>
          </select>
          <select>
            <option>Sort of Date</option>
          </select>
        </div>

        <div className="table">
          <div className='table_header'>
            <span>Type</span>
            <span>Data</span>
            <span>Category / Sentiment</span>
            <span>Score / Word Count</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
        </div>
        </div>
    </HistoryFormBlock>
  )
  

}

export default HistotyForm