import React from 'react';
import styled from 'styled-components';

import { Formik, Form } from "formik";
import Card from '../info-card/info-card';
import Button from '../button/button';
import { Row } from '../../global-style';
import { postBooking } from '../../services/locations'


const Input = styled.input`
  border-radius: 3px;
  outline: none;
  border-style: solid;
  padding: 3px;
  border: 1px solid;
  font-size: .8rem;
  align-self: stretch;
  margin-left: auto;
  margin-right: 8px;
  max-width: 62px;
`;


export default function Booking ({ onClose, parkingData, onSuccess, onFailure }) {

  React.useEffect(() => {    
  },[])

  /* {formik.touched.firstName && formik.errors.firstName ? (
  <div>{formik.errors.firstName}</div>
  ) : null} */

  return (
    <Formik
      initialValues={{ licensePlate: ''}}
      enableReinitialize="true"
      onSubmit={(values) => {
        postBooking(parkingData._id, values)
        .then(res => onSuccess && onSuccess(res))
        .catch(err => onFailure && onFailure(err))
      }}
    >
      {formik => (
        <Card 
          title={`Reserve no setor ${parkingData.sector}`}
          onClose={onClose}
        >
          <Form 
            onSubmit={formik.handleSubmit}
            style={{width: '100%'}}
          >
            <Row style={{ alignItems: 'center' }}>
              <label htmlFor="licensePlate">Placa do veículo</label>
              <Input 
                id="licensePlate" 
                {...formik.getFieldProps('licensePlate')} 
                maxLength="7"
              />
              <Button 
                variant='success'
                type='button'
                onClick={e => {
                  e.preventDefault();
                  formik.submitForm();
                }}
                disabled={formik.values.licensePlate.length < 7}
              >
                Reservar
              </Button>
            </Row>
            {formik.values.licensePlate.length < 7
              ? <div 
                  style={{
                      textAlign: 'right',
                      marginTop: 5,
                      marginRight: 5,
                      color: '#F44336'
                  }}
                >
                  {formik.errors.licensePlate}
                </div>
              : null}
          </Form>
        </Card>
      )}
    </Formik>
  );
};