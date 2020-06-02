import React from 'react';
import styled from 'styled-components';
import { Col } from './../../global-style'
import Card from '../info-card/info-card';
import Button from '../button/button';



const InfoContent = styled.div`
  text-align: left;
  font-size: medium;  

  .pk-total{
    font-size: small;
    margin-left:2px;
  }
`;


export default function MapInfo ({ sector, total, available, onBooking, onClose }) {

  const handleBooking = () => onBooking({ sector, available, total });

  console.log( sector, total, available)

  return (
    <Card 
      title={`Estacionamento ${sector}`}
      onClose={e => onClose && onClose(e)}
    >
      <Col>
        <InfoContent style={{marginBottom: '4px'}}>
          <span>Vagas disponíveis</span>
        </InfoContent>
        <InfoContent>
          <span>{available}</span>
          <span className="pk-total">/{total}</span>
        </InfoContent> 
      </Col> 
      <Col style={{marginLeft: 'auto', alignSelf: 'center'}}>
        <Button 
          onClick={handleBooking}
          variant='success'
        >
          Reservar
        </Button>
      </Col> 
    </Card>
  );
};