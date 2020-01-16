import React from 'react';
import styled from 'styled-components';

type DestinationRecTypes = {url:string}

export const DestinationRec = ({url}:DestinationRecTypes) => {
  
  const ImgContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 10px;
    object-fit: fill;
    background-image: url(${url});
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    height: 150px;
    @media (max-width: 758px) {
      height: 100px;
    }
  `

  return (
    <ImgContainer />
  )
}