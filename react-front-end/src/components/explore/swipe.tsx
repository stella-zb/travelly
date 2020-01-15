import React, { useState, FC } from "react";
import Slider from "react-animated-slider";
import axios from "axios";

import {
  Container,
  Attractions,
  SliderContent,
  Inner,
  Name,
  Button,
  Description
} from "./swipe.component";

import './Swipe.css';

// import "react-animated-slider/build/horizontal.css";

interface SwipeProps {
  attractions: Array<any>;
  handleSubmit?: (e: AttractionsObject) => void;
  itinerariesId: number;
}

interface AttractionsObject {
  id: string;
  name: string;
  description: string;
  review: number | null;
  lat: number;
  long: number;
  open_time: number | null;
  close_time: number | null;
  visit_duration: number | null;
  photo: string;
  location: string;
}

export const Swipe: FC<SwipeProps> = ({
  attractions,
  handleSubmit,
  itinerariesId
}) => {
  //setfilter object

  handleSubmit = (item: AttractionsObject) => {
    console.log("check");

    // const CancelToken = axios.CancelToken;
    // const source = CancelToken.source();

    axios.defaults.baseURL = "http://localhost:8081";
    axios(`/api/itineraries/${itinerariesId}`, {
      method: "post",
      data: {
        attraction: item
      },
      // withCredentials: true
      params: {
        user: localStorage.userID,
      },
      // cancelToken: source.token
    }).then(() => {
      console.log('post attraction')
      // history.push(`/explore/:${search.query}`);
    });
    // .catch((err) => console.log(err))
  };

  return (
    <Container>
      <Attractions>
        <Slider
          className="slider-wrapper"
          style={{ display: "flex !important", zIndex: 90 }}
        >
          {attractions.map((item, index) => (
            <form
              key={index}
              onSubmit={e => {
                e.preventDefault();
                handleSubmit(item);
              }}
            >
              <SliderContent
                key={index}
                className="slider-content"
                style={{
                  background: `linear-gradient(
                    to bottom,
                    rgba(0, 0, 0, 0.65),
                    rgba(0, 0, 0, 0.65)
                  ), url('${item.photo}') no-repeat center center`,
                  borderRadius: "15px",
                  border: "solid",
                  backgroundSize: "cover",
                  borderColor: "#FCFCFC",
                  borderWidth: "2px",
                  color: "#FCFCFC"

                }}
              >
                <Inner className="inner">
                  <Name>{item.name}</Name>
                  <Description>{item.location}</Description>
                  <Button type="submit" value={item}>Select</Button>
                </Inner>
              </SliderContent>
            </form>
          ))}
        </Slider>
      </Attractions>
    </Container>
  );
};
