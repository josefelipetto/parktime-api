import React from 'react';
import './login.css';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import api from '../../services/api'
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

export default function Login () {

  const history = useHistory();

  const [email, setEmailValue] = React.useState('');
  const [password, setPassValue] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const auth = async e => {
    e.preventDefault();

    setLoading(true);
  

    try {
      
      const response = await api.post('/login',{user:email, password});
      localStorage.setItem('pktime', JSON.stringify(response.data));

      setLoading(false);
      history.push('/map');

    } catch (error) {
      console.error(error)

      setLoading(false);
    }
    
  }

  return (
    <div className="Login">
      <form className="combo" onSubmit={auth} noValidate autoComplete="on">
        <div>
          <TextField 
            label="Email"
            id='email'
            name='email'
            type='email'
            variant="outlined"
            value={email}
            onChange={e => setEmailValue(e.target.value)}
            fullWidth={true}
          />
        </div>
        <div>
          <TextField 
            label="Senha"
            id='password'
            name='password'
            type='password'
            variant="outlined"
            fullWidth={true}
            value={password}
            onChange={e => setPassValue(e.target.value)}
          />
        </div>
        <div className="actions">
          <Button 
            variant="contained" 
            color="primary" 
            type='submit'
            disabled={loading}
          >
            {!loading
              ? 'Login'
              : <CircularProgress size={24} />}
          </Button>
          <Button 
            variant='outlined' 
            color="primary"
            onClick={() => history.push('/signup')}
          >
            Cadastre-se
          </Button>
        </div>
      </form>
    </div>
  );
}