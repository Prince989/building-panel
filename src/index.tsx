import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Router } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import LoginPage from './Components/LoginPage';
import { Navigate, Outlet } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import Contactor from './pages/contactor';
import Suppliers from './pages/suppliers';
import { store } from './lib/store';
import SignUp from './pages/sign-up';
import { Provider } from 'react-redux';
import Projects from './pages/projects';
import AuthProvider, { useAuth } from './AuthContext';
import Login from './pages/login';
import HomePage from './pages/home';

const PrivateRoute = () => {
  const user = useAuth();


  if (user.user?.id || user.token){
    return <Outlet />
  }
  else{
    return <Navigate to="/auth/login" />;
  }
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = createTheme({
  typography: {
    fontFamily: "roboto"
  },
  palette: {
    primary: {
      main: "#140092"
    },
    secondary: {
      main: "#4e3350",
      dark: "#725374"
    }
  }
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/auth/sign-up' element={<SignUp />} />
                <Route path='/contactors' element={<Contactor />} />
                <Route path='/projects' element={<Projects />} />
                <Route path='/suppliers' element={<Suppliers />} />
                <Route element={<PrivateRoute />}>
                  <Route path='/dashboard' element={<App />} />
                </Route>
                <Route path='auth/login' element={<Login />} />
              </Routes >
            </AuthProvider>
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode >
);

reportWebVitals();
