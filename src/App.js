
import React from 'react';
import Search from './components/Search';
import MainContent from './components/MainContent';
import s from './components/styles/App.module.css';
import styled from 'styled-components'
import logo from './img/Logo.svg'

const App = () => {

  return (
    <div>
       <div><img src={logo}/></div>
      <Search/>
      <MainContent/>
      
    </div>
  );
}

export default App;
