import React from 'react';
import './user-info.css';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import api from '../../services/locations'
import { useHistory } from 'react-router-dom';
import FullLoader from '../../components/full-loader/full-loader'
import { Formik } from 'formik';
import { MdExitToApp, MdArrowBack } from 'react-icons/md'
import { toast } from 'react-toastify';

export default function UserInfo () {

  const history = useHistory();
  const [userInfo, setUserInfo] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const logout = () => {
    localStorage.removeItem('pktime')
    localStorage.clear()
    history.push('/login')
  }

  React.useEffect(() => {
    api.get('/users')
    .then((response) => {
      setUserInfo(response.data)
      setIsLoading(false)
    })    
    .catch((err) => {
      setError(err)
    })
  }, [])

  React.useEffect(() => {
    if(!error) {
      return
    }

    toast.error('Não foi possível buscar os dados do seu perfil')
    history.push('/map')
    
  }, [error])

  if(isLoading) {
    return <FullLoader/>
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
      <div className="UserInfo">
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <div className='userdata' style={{ marginRight: 'auto' }}>
            <span style={{display: 'inline-flex', cursor: 'pointer'}} onClick={() => history.push('/map')}>
              <MdArrowBack color='#e91e63' size='20px' /> Voltar
            </span>
          </div>
          <div className='userdata' style={{ marginLeft: 'auto' }}>
            <span style={{display: 'inline-flex', cursor: 'pointer'}} onClick={logout}>
              Logout <MdExitToApp color='#e91e63' size='20px' />
            </span>
          </div>
        </div>
        <div className='userdata' style={{ padding: '1rem' }}>
          <h3>{userInfo.name || ''}</h3>
          <p>{userInfo.name || ''}</p>
          <p>{userInfo.email || ''}</p>
        </div>
      </div>
      <div style={{display: 'flex', flex: 1, padding: '1rem'}}>
        oaihdoadoaisdo
      </div>
    </div>
  );
}