import React from 'react';
import { GlobalStyle } from './global-style';

import Providers from './providers';
import Routes from './router/routes';


import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { AppBar } from '@material-ui/core';
toast.configure();

function App() {

  const logged = (localStorage.getItem('pktime') || '').includes('_id');

  return (
    <Providers>      
      <Routes/>
    </Providers>
  );
}

export default App;
