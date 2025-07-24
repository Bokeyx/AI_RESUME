import './App.css';
import GlobalStyles from './lib/GlobalStyles';
import MainRouter from './routers/MainRouters';
import { BrowserRouter } from 'react-router-dom';
import AppRouters from './routers/AppRouters';
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <MainRouter />
      <AppRouters />
    </BrowserRouter>
  );
}

export default App;
