import styled from 'styled-components'
import edit from '../../lib/img/icon/Edit.png';
import sidebar from '../../lib/img/icon/Sidebar.png';
import { useState } from 'react';


const HeaderBlock = styled.div`
  height: 6%;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 98%;
  align-items: center;
  margin: auto;
    
  .title {
    font-weight: bold; 
    font-size: 25px;
    margin-left: 2%;
  }
  
  .menu {
    display: flex;
    margin-right: 10px;
    align-items: center;
  }
  #circle {
    border-radius: 50%;
    background: var(--sub-color);
    width: 30px;
    height: 30px;
  }
`;

const Logo = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  .icon_box {
    display: flex; 
    img: hover {
      cursor: pointer;
    }
    .icon_menu {
      margin-right: 5px;
    }
  }
`;

const Header = ({ leftMenu, setLeftMenu }) => {

  // const [category, setCategory] = useState('home');
  // const onSelect = useCallback(category => setCategory(category), []);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  return (
    <HeaderBlock>
        <Wrapper>
          <Logo>
            {!leftMenu && (
              <div className='icon_box'>
                <img src={sidebar} alt="icon" className='icon_menu' onClick={() => setLeftMenu(prev => !prev)}/>
                <img src={edit} alt="icon" />
              </div>
            )}
          
            <div className='title'>AI Resume</div>
          </Logo>
          
          <div className='menu'>
            {/* <Categories category={category} onSelect={onSelect} /> */}
            <span id='circle' onClick={() => setIsDropDownOpen(prev => !prev)}></span>
            {isDropDownOpen && (
              <div>드롭다운</div>
            )}
          </div>
        </Wrapper>
    </HeaderBlock>
  )
}

export default Header; 