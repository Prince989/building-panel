import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/Dashboard/Header';
import DashboardMenu from './Components/Dashboard/DashboardMenu';
import { Provider } from 'react-redux';
import { store } from './lib/store';
import Projects from './Components/Dashboard/EmployerPanel/Projects';

function App() {
  return (
    <Provider store={store}>
      <div className='flex w-full'>
        <div className='w-full mr-[30px]'>
          <Header />
          {/* <DashboardContainer /> */}
          <Projects />
        </div>
        <DashboardMenu />
      </div>
    </Provider>
  );
}

export default App;
