import React from 'react';
import { useHistory } from 'react-router-dom';
import {getSectors} from '../../services/locations';


import styled from 'styled-components';
import MapInfo from '../../components/map-info/map-info';
import ParkingMap from '../../components/parking-map/parking-map';
import Booking from '../../components/booking/booking';
import { toast } from 'react-toastify';
import { FaUserCircle } from 'react-icons/fa'

const MapContainer = styled.div``;

const infoState = {
  isOpen: false,
  initialValues: null,
};

const bookingState = {
  isOpen: false,
  initialValues: null,
};

const geojson = {
  type: 'FeatureCollection',
  features: []
};

const InfoContainer = styled.div`
  position: absolute;
  top: 5%;
  right: 0;
  width: 100%;
  max-width: 430px;
  min-width: 280px;
  z-index: 1000;
`;

const StyledBooking = styled.div`
  visibility: ${props => !props.hidden ? 'visible' : 'hidden'};
`;

export default function Map (props) {

  const history = useHistory();

  const [mapData, setMapData] = React.useState(geojson);
  const [bookingStatus, setBookingStatus] = React.useState(bookingState);
  const [infoStatus, setInfoStatus] = React.useState(infoState);

  React.useEffect(() => {    
    getSectors()    
    .then(resp => setMapData({ ...mapData, features: (resp.data || []).map(f => f.geojson) }))    
  },[])

  const handleOnBooking = () => {
    setBookingStatus({ ...bookingStatus, isOpen: !bookingStatus.isOpen });
    setInfoStatus({ ...infoStatus, isOpen: false });
  }

  const handleOnCloseInfo = e => {    
    setInfoStatus(infoState);
  }

  const handleOnCloseForm = e => {    
    setBookingStatus(bookingState)
    setInfoStatus({ ...infoStatus, isOpen: true });
  }

  const handleOnFeatureClick = feature => {
    setInfoStatus({
      isOpen: true,
      initialValues: feature
    });
  }

  const onSuccess = data => {

    console.log(data)

    setBookingStatus(bookingState)
    setInfoStatus(infoState);

    toast.success('Reserva concluida', {
      position: "bottom-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
    });
  }

  return (
    <MapContainer>
      <ParkingMap 
        parkingData={mapData}
        onFeatureClick={handleOnFeatureClick}
      />
      <InfoContainer>
        {infoStatus.isOpen
          ? (
            <MapInfo 
              {...infoStatus.initialValues}
              onClose={handleOnCloseInfo}
              onBooking={handleOnBooking}
            />
          )
          : null}
        {!bookingStatus.isOpen 
        ? null 
        : (
          <Booking
            onClose={handleOnCloseForm}
            parkingData={infoStatus.initialValues}
            onSuccess={onSuccess}
          />
        )}       
      </InfoContainer>
      <div
        style={{
          position: 'absolute',
          bottom: 30,
          right: 30,
          zIndex: 1000,
          background: '#000',
          color: '#fff',
          borderRadius: '100%',
          cursor: 'pointer'
        }}
      >
        <FaUserCircle size='40px' onClick={() => history.push('/user')}/>
      </div>
    </MapContainer>
  );
};