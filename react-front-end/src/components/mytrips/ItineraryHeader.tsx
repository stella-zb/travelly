import React from 'react';
import styled from 'styled-components';
import edit from '../../images/edit.png';
import {Day} from './Day';
import { InviteIcon } from './InviteIcon';

const Days = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 60%;
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 70px;
  padding: 10px;
  margin: 0px;
  border-bottom: 1px solid #A4ADA6;
`

const ActionIcon = styled.img`
  width: 30px;
  margin-right: 5px;
  margin-left: 5px;
`

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

type PropTypes = { editAction: any, length: Array<string>, selected:string, onClick:any, setInvite:any }

export const ItineraryHeader = ({editAction, length, onClick, selected, setInvite}: PropTypes) => {
  const id:string = location.pathname.slice(location.pathname.lastIndexOf('/') + 1);

  return (
    <Header>
      <Days>
        {length.map(num =>
          <Day key={Number(num)} id={num} number={num} selectDay={() => onClick(num)} selected={selected} />
        )}
      </Days>

      <Actions>
        <ActionIcon src={edit} onClick={editAction} />
        <InviteIcon id={id} setInvite={() => setInvite(true)} />
      </Actions>

    </Header>
  )
}