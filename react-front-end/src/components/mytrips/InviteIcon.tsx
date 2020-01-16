import React, { useState } from 'react';
import styled from 'styled-components';
import add from '../../images/add-user.png';

const ActionIcon = styled.img`
  width: 35px;
  margin-right: 5px;
  margin-left: 5px;
  &:hover {
    cursor: pointer;
  }
`
type PropTypes = {id:string, setInvite:any}
export const InviteIcon = ({id, setInvite}:PropTypes) => {

  return (
    <ActionIcon src= {add} onClick={setInvite} />
  )
}