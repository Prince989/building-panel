import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/Dashboard/Header';
import DashboardMenu from './Components/Dashboard/DashboardMenu';
import { Provider } from 'react-redux';
import { store } from './lib/store';
import Products from './Components/Dashboard/ProviderPanel/Products';
import Projects from './Components/Dashboard/EmployerPanel/Projects';
import ContactorProjects from './Components/Dashboard/ContactorPanel/Projects';
import { useAuth } from './AuthContext';

function App() {
  const user = useAuth();

  return (
    <Provider store={store}>
      <div className='flex w-full'>
        <div className='w-full mr-[30px]'>
          <Header />
          {/* <DashboardContainer /> */}
          {
            user.user?.roleId == 1 ?
              <Projects />
              :
              user.user?.roleId == 2 ?
                <ContactorProjects />
                :
                user.user?.roleId == 3 ?
                  <Products />
                  :
                  ""
          }
        </div>
        <DashboardMenu />
      </div>
    </Provider>
  );
}

export default App;
