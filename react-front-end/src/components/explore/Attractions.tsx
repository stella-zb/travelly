import React, { useState, FC, Fragment, useEffect } from 'react';
import { Redirect, Link } from "react-router-dom";
import axios from 'axios';

import { Filter } from "./Filter";
import { Swipe } from "./swipe"
import { shuffleAttractions, getAttractions, applyFilter} from "../../helpers/attractionsSorting";

import { 
  Container,
  TopBar,
  Attractions,
  City,
  NavButton
} from "./swipe.component";

import "react-animated-slider/build/horizontal.css";


interface SwipeProps {
  // style?: React.CSSProperties | undefined
  itinerariesId: number;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  handleNavigate?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
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

export const AttractionList: FC<SwipeProps> = ({ itinerariesId, handleNavigate }) => {

  const [attractions, setAttractions] = useState<Array<AttractionsObject>>([]);
  const [city, setCity] = useState<string>('');
  const [filters, setFilters] = useState<Array<string>>([]);

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
    })
    .catch((err) => console.log(err));
  },[filters]);
  
  // handleNavigate = () => {
  //   return <Redirect to={`/trips/:${itinerariesId}`}/>;
  // }
  return (
    <Container>
      <TopBar>
        <City>{city}</City>
        <Filter attractions={attractions} setFilters={setFilters}/>
      </TopBar>
      <Attractions>
        <Swipe attractions={attractions} itinerariesId={itinerariesId}/>
      </Attractions>
      <Link to={`/trips/${itinerariesId}`}> <NavButton>Go</NavButton></Link>
    </Container>
  );
};