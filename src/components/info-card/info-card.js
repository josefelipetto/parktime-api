import React from 'react';
import styled from 'styled-components';
import { Row } from './../../global-style'
import {IoMdClose} from 'react-icons/io';

const InfoCard = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 5%;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 2px 3px 11px 2px #0000002b;
  min-height: 16px;

`;

const InfoHeader = styled.div`
  display: flex;
  flex-direction: row;
  h4 {
    margin: 0;
  }
`;

const InfoDivider = styled.div`
  height: 1px;
  margin-top: 8px;
  margin-bottom: 8px;
  background-color: #e0e0e0;  
`;

const StyledIcon = styled(IoMdClose)`
  margin-left: auto;
  :hover{
    cursor: pointer;
  }
`;

export default function Card ({ title, hasDivider, onClose, children }) {
  return (
    <InfoCard>
      <InfoHeader>
        {!title 
          ? null 
          : <h4>{title}</h4>}
        {!onClose ? null : <StyledIcon className="noselect" onClick={e => onClose && onClose(e)} />}
      </InfoHeader>
      {(!title && !hasDivider) ? null : <InfoDivider/>}
      <Row>
        {children}
      </Row>     
    </InfoCard>
  );
};