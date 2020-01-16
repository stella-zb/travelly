import React, { Fragment } from "react";
import styled from 'styled-components';
import {DestinationRec} from './Destination';

type DestRecProps = { 
  cityName: string,
  topRecommended: string ,
  selected?: string | null,
  search?: any
  // children: ReactNode
};

const Destination = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  width: 90%;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`


export const DestRec: React.FC<DestRecProps> = () => {  
    return (
      <>
      <Container>
        <Destination><h3>Vancouver</h3><DestinationRec url='http://www.destination360.com/north-america/canada/vancouver/images/s/vancouver-bc.jpg' /></Destination>
        <Destination><h3>Tokyo</h3><DestinationRec url='https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' /></Destination>
      </Container>
      <Container>
        <Destination><h3>Seattle</h3><DestinationRec url='https://www.citizenm.com/cache/images/seattle_city_image_1200x675-1_004b02a34b02a3.jpg' /></Destination>
        <Destination><h3>London</h3><DestinationRec url='https://images.unsplash.com/photo-1505761671935-60b3a7427bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' /></Destination>
      </Container>
      </>
    )
}