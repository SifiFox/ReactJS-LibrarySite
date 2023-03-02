import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, useNavigate, Routes, useLocation } from 'react-router-dom';

import { Provider } from 'react-redux/es/exports';
import { store } from './redux/store';

import { MainPage } from './pages/main';
import { BookPage } from './pages/book';
import { ContractPage } from './pages/contract';
import { TermsPage } from './pages/terms';
import { AuthPage } from './pages/reg-auth-pages/auth';

import './index.css';
import { RegistrationPage } from './pages/reg-auth-pages/registration';
import { ForgotPassPage } from './pages/reg-auth-pages/forgot-pass';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/all' element={<MainPage />} />
          <Route path='/books' element={<MainPage />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/registration' element={<RegistrationPage />} />
          <Route path='/forgot-pass' element={<ForgotPassPage />} />
          <Route path='/books/:category/:id' element={<BookPage />} />
          <Route path='/contract' element={<ContractPage />} />
          <Route path='/terms' element={<TermsPage />} />
          <Route path='*' element={<MainPage />} />
        </Routes>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
