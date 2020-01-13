import React, { useState, FC, Fragment, useEffect } from 'react';
import axios from 'axios';

import { Filter } from "./Filter";
import { Swipe } from "./swipe"

import { 
  Container,
  TopBar,
  Attractions,
  City
} from "./swipe.component";

import "react-animated-slider/build/horizontal.css";


interface SwipeProps {
  // style?: React.CSSProperties | undefined
  itinerariesId: number
  
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

  //helper functions
  //to shuffle all attractions in a random way  
  const shuffleAttractions = (array: Array<any>) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i - 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  //create an object to apply filters

  let attractionObject:any = {};
  let filteredAttr: Array<any> = [];

  const getAttractions = (attractionObject: any, attractionsShuffle:Array<{category: string}>) => {
    for (let i = 0; i < attractionsShuffle.length; i++) {
      if (attractionObject[attractionsShuffle[i].category]) {
        attractionObject[attractionsShuffle[i].category].push(attractionsShuffle[i])
      } else {
        attractionObject[attractionsShuffle[i].category] = [attractionsShuffle[i]]
      }
    }
    return attractionObject;
  };

  //apply filters from props to create new attractions array

  const applyFilter = (attrObject: any, array: Array<any>) => {
    let filteredAttraction: Array<any> = [];
    if (!array.length) {
      for (let i in attrObject) {
        filteredAttraction = filteredAttraction.concat(attrObject[i])
      }
    } else {
      for (let i of array) {
        if (attrObject.hasOwnProperty(i)) {
          filteredAttraction = filteredAttraction.concat(attrObject[i]);
        }
      }
    }
    return filteredAttraction;
  };

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
      console.log(shuffledAttractions);
      setAttractions(shuffleAttractions)

      const attractionsObject = getAttractions(attractionObject, shuffledAttractions);
      console.log(attractionsObject);
      console.log(filters)
      const result = applyFilter(attractionsObject, filters)
      setAttractions(result);
      getAttractions(attractionObject, attractions);
      console.log('attractions object', result);
    })
    .catch((err) => console.log(err));
  },[filters]);

  // getAttractions(attractionObject, attractions);
  // applyFilter(getAttractions(attractionObject, attractions), filters);
  // setAttractions(applyFilter(getAttractions(attractionObject, attractions), filters));
  console.log(attractions)
    
  return (
    <Container>
      <TopBar>
        <City>{city}</City>
        <Filter attractions={attractions} setFilters={setFilters}/>
      </TopBar>
      <Attractions>
        <Swipe attractions={attractions} itinerariesId={itinerariesId}/>
    </Attractions>
    </Container>
  );
};