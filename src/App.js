
import React from 'react';
import Search from './components/Search';
import MainContent from './components/MainContent';
import s from './components/styles/App.module.css';
import logo from './img/Logo.png'


const App = () => {
  // style={{ backgroundImage: `url(${bcgImg})` }}
  return (
    <div className={s.allWrapper} >
       <div className={s.contentWrapper}>
          <div className={s.Logo}><img src={logo}/></div>
          <Search/>
          <MainContent/>
      </div>
    </div>
  );
}

export default App;
