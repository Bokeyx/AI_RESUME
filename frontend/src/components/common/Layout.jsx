import styled from 'styled-components';   
import LeftMenubar from '../LeftMenubar';
import { Outlet } from "react-router-dom";
import Header from './Header';
import { useState } from 'react';

const LayoutBlock = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const Sidebar = styled.div`
  background: var(--light-blue);
  width: 15%;
`;

const MainContent = styled.div`
  width: 100%;
  height: 100vh; 
  .logo {
    display: fel
  }
` 


const Layout = () => {
  const [leftMenu, setLeftMenu] = useState(true);

  return (
    <LayoutBlock>
      {leftMenu && (
        <Sidebar>
          <LeftMenubar setLeftMenu={setLeftMenu}/>
        </Sidebar>
      )}

    <MainContent>

      <Header leftMenu={leftMenu} setLeftMenu={setLeftMenu}/>
      <Outlet />
    </MainContent>

    </LayoutBlock>    
  )

}

export default Layout;