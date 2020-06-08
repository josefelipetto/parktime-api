import React from 'react';

import Providers from './providers';
import Routes from './router/routes';


import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
toast.configure();

function App() {
  return (
    <Providers>      
      <Routes/>
    </Providers>
  );
}

export default App;
