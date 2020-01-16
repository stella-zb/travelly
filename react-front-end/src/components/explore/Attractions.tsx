import React, { useState, FC, Fragment, useEffect } from 'react';
import { Redirect, Link } from "react-router-dom";
import axios from 'axios';

import { Filter } from "./Filter";
import { Swipe } from "./swipe"
import { shuffleAttractions, getAttractions, applyFilter} from "../../helpers/attractionsSorting";
import spinner from '../../images/spinner.svg';
import styled from 'styled-components';

import { 
  Container,
  TopBar,
  Attractions,
  City,
  NavButton
} from "./swipe.component";

import "react-animated-slider/build/horizontal.css";

const Modal = styled.div`
    background: #FCFCFC;
    z-index: 9999999;
    height: 100vh;
    width: 100vw;
  `;

interface SwipeProps {
  // style?: React.CSSProperties | undefined
  itinerariesId: number;
};

interface AttractionsObject {
  id: string,
  name: string,
  description: string,
  review: number | null,
  lat: number,
  long: number,
  open_time: number | null,
  close_time: number | null,
  visit_duration: number | null,
  photo: string
  location: string,
  category: string
};

export const AttractionList: FC<SwipeProps> = ({ itinerariesId }) => {

  const [attractions, setAttractions] = useState<Array<AttractionsObject>>([]);
  const [city, setCity] = useState<string>('');
  const [filters, setFilters] = useState<Array<string>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  let attractionObject:any = {};

  useEffect(() => {
    axios.defaults.baseURL = 'http://localhost:8081';
    axios.get(`/api/itineraries/${itinerariesId}`, {
      params : {
        itinerariesId
      }
    })
    .then(res => {
      setCity(res.data[1]);
      const shuffledAttractions = shuffleAttractions(res.data[0]);
      setAttractions(shuffleAttractions)
      const attractionsObject = getAttractions(attractionObject, shuffledAttractions);
      const result = applyFilter(attractionsObject, filters)
      setAttractions(result);
      getAttractions(attractionObject, attractions);
      setLoading(false);
    })
    .catch((err) => console.log(err));
  },[filters]);
  
  return (
    <Container>
      {loading && <Modal><img src={spinner} /><br />Loading...</Modal>}
      <TopBar>
        <City>{city}</City>
        <Filter attractions={attractions} setFilters={setFilters}/>
      </TopBar>
      <Attractions>
        <Swipe key={itinerariesId} attractions={attractions} itinerariesId={itinerariesId}/>
      </Attractions>
      <Link to={`/trips/${itinerariesId}`}> <NavButton>Go</NavButton></Link>
    </Container>
  );
};