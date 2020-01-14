import React from 'react';
import styled from 'styled-components';

type PropTypes = { id: number, name: string, img: string, editable: boolean, deleteAttraction: any, submitter:string|null }

const Name = styled.h2`
  text-align: center;
  color: #fff;
`;

const DeleteButton = styled.button`
  background: rgba(0, 0, 0, 0.7);
  border: solid 1px #F55D3E;
  color: #F55D3E;
  border-radius: 15px;
  font-size: 12px;
`

const Submitter = styled.p`
  color: #fff;
`

const Actions = styled.div`
  text-align: left;
`

export const Attraction = ({id, name, img, editable, deleteAttraction, submitter}: PropTypes) => {
  const Container = styled.div`
    padding: 10px 20px 15px 20px;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${img});
    background-size: 100%;
    background-position: center;
    border-radius: 15px;
  `;

  return (
    <Container>
      <Name>{name}</Name>
      
      <Actions>
        {submitter && <Submitter>Added by: {submitter}</Submitter>}
        {editable && <DeleteButton onClick={() => deleteAttraction(id)}>DELETE</DeleteButton>}
      </Actions>
    </Container>
  )
}

