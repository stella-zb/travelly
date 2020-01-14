import React from 'react';
import styled from 'styled-components';

type PropTypes = { id: number, name: string, img: string, editable: boolean, deleteAttraction: any, submitter:string|null }

const Name = styled.div`
  text-align: center;
  color: #fff;
  height: 100px;
  display: flex
  justify-content: center;
  align-items: center;
  position: relative;
  left: 15px;
  padding-right: 13px;
  padding-left: 13px;
`;

const DeleteButton = styled.button`
  background: rgba(0, 0, 0, 0.7);
  border: solid 1px #F55D3E;
  color: #F55D3E;
  border-radius: 15px;
  font-size: 12px;
`

const Submitter = styled.div`
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  border: solid 1px #fff;
  border-radius: 50%
  height: 20px;
  width: 20px;
  line-height: 20px;
  margin-top: 4px;
  float: right;
  position: relative;
  left: 5px;
  font-size: 11px;
`

const Actions = styled.div`
  text-align: right;
  position: relative;
  bottom: 15px;
`

export const Attraction = ({id, name, img, editable, deleteAttraction, submitter}: PropTypes) => {
  const Container = styled.div`
    padding: 10px 20px 15px 20px;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${img});
    background-size: 100%;
    background-position: center;
    border-radius: 15px;
    height: 100px;
  `;

  return (
    <Container>
        {submitter && <Submitter>{submitter[0]}</Submitter>}
      <Name><h2>{name}</h2></Name>
      
      <Actions>
        {editable && <DeleteButton onClick={() => deleteAttraction(id)}>DELETE</DeleteButton>}
      </Actions>
    </Container>
  )
}

