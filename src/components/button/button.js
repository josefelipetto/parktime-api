import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`  
  color: white;
  font-size: .8rem;
  padding: 8px;
  height: auto;
  border-radius: 4px;
  font-weight: bold;
  color: #fff;
  outline-color: none;
  outline: none;

  background: ${props => {
    switch (props.variant) {
      case "success":
        return '#4caf50';         
      case "warning":
        return 'rgb(223, 117, 20)';
      case "error":
        return 'rgb(223, 117, 20)';            
      default:
        return 'rgb(66, 184, 221)';
    }
  }};

  :disabled,
  [disabled]{
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
  }
`;

export default function Button (props) {

  return (
    <StyledButton {...props}>{props.children}</StyledButton>
  );
};