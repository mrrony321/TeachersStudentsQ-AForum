import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Landingpage } from './pages/landingpage/src/landingpage';
import { Login } from './pages/login/src/login';
import { OtpValidation } from './pages/otpValidation/src/otpValidation';
import { Registration } from './pages/registration/src/registration';
import { CompanyRegistration } from './pages/companyRegistration/src/registration';
import { SearchContainer } from './pages/searchContainer/src/searchContainer';
import Dashboard from './component/dashboard/Dashboard';


function App() {
  return (
      <Routes>
      <Route path='/' element={<Landingpage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Registration/>}/> 
      <Route path='/otp' element={<OtpValidation/>}/>
      <Route path='/admin' element={<OtpValidation/>}/>
      <Route path='/manager' element={<OtpValidation/>}/>
      <Route path='/user' element={<OtpValidation/>}/>
      <Route path='/onboard' element={<CompanyRegistration/>}/>
      <Route path='/turf/search' element={<SearchContainer/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
  );
}

export default App;
