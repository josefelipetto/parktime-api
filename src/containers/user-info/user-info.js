import React from 'react';
import './user-info.css';

import api from '../../services/locations'
import { useHistory } from 'react-router-dom';
import FullLoader from '../../components/full-loader/full-loader'
import { MdExitToApp, MdArrowBack } from 'react-icons/md'
import { toast } from 'react-toastify';
import CustomDialog from '../../components/custom-dialog/custom-dialog';
import { List, ListItem, makeStyles, ListItemText, ListItemSecondaryAction } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  }
}));

export default function UserInfo () {

  const history = useHistory();
  const [userInfo, setUserInfo] = React.useState();
  const [reservations, setReservations] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };


  const logout = () => {
    localStorage.removeItem('@pktime')
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

    api.get('/reservations')
    .then((response) => {
      setReservations(response.data)      
    })    
    .catch((err) => {
      console.log('err', err)
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

  const deleteReservation = reservation => {
    api.delete(`/reservations/${reservation._id}`,{
      data: {
        ...reservation
      }
    })
    .then(resp => {
      setReservations(reservations.filter(r => r._id !== reservation._id))
    })
    .catch(err => {console.log(err.response.data)})
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
          <p>{userInfo.email || ''}</p>
          <p>{(userInfo.car || {}).licensePlate || ''}</p>
        </div>
      </div>
      <div style={{display: 'flex', flex: 1, padding: '1rem', flexDirection: 'column'}}>
        <h2>Reservas</h2>
        <List className={classes.root}>
          {reservations.map((reserva) => {
            const labelId = `checkbox-list-label-${reserva._id}`;
            const dte = `${reserva.name} - ${new Date(reserva.time).toLocaleDateString()} ${new Date(reserva.time).toLocaleTimeString()}`
            const onlyDate = `${new Date(reserva.time).toLocaleDateString()}`
            const todayDate = `${new Date().toLocaleDateString()}`
            return (
              <ListItem key={reserva._id} role={undefined} dense>
                <ListItemText id={labelId} primary={`${dte}`} />
                {onlyDate === todayDate
                  ? <ListItemSecondaryAction>
                      <CustomDialog 
                        text={dte} 
                        onConfim={() => deleteReservation(reserva)}
                        onCancel={() => console.log('cancelou')}
                      />
                    </ListItemSecondaryAction>
                  :null}
              </ListItem>
            );
          })}
        </List>
        {!reservations.length 
          ? <p style={{ textAlign: 'center' }}>Nenhuma reserva encontrada</p>
          : null}
      </div>
    </div>
  );
}