import styled from 'styled-components';
import { useCallback, useState } from 'react';
import Categories from './common/Categories';
import edit from '../lib/img/icon/Edit.png';
import sidebar from '../lib/img/icon/Sidebar.png';

const LeftMenubarBlock = styled.div`
  width: 100%;
  height : 100%;

  .top_menu {
    width: 86%;
    display: flex;
    justify-content: space-between;
    margin: 5% auto;
  }
  
  img:hover {
    cursor: pointer;
    }
`;

const LeftMenubar = ({ setLeftMenu }) => {

    const [category, setCategory] = useState('home');
    const onSelect = useCallback(category => setCategory(category), []);
    
  return (
    <LeftMenubarBlock>
      <div className="top_menu">
        <img src={sidebar} alt="icon" className='icon_menu' onClick={() => setLeftMenu(prev => !prev)}/>
        <img src={edit} alt="icon" />
      </div>
      <Categories category={category} onSelect={onSelect} />
    </LeftMenubarBlock>
  )
}

export default LeftMenubar;