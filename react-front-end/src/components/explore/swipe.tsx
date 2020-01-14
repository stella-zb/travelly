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

import "react-animated-slider/build/horizontal.css";

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
    axios.defaults.baseURL = "http://localhost:8081";
    axios(`/api/itineraries/${itinerariesId}`, {
      method: "post",
      data: {
        attraction: item
      },
      // withCredentials: true
      params: {
        user: localStorage.userID
      }
    }).then(() => {
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
              onSubmit={e => {
                e.preventDefault();
                handleSubmit(item);
              }}
            >
              <SliderContent
                key={index}
                className="slider-content"
                style={{
                  background: `url('${item.photo}') no-repeat center center`,
                  borderRadius: "15px"
                }}
              >
                <Inner className="inner">
                  <Name>{item.name}</Name>
                  <Description>{item.location}</Description>
                  <Button type="submit" value={item}>
                    Select
                  </Button>
                </Inner>
              </SliderContent>
            </form>
          ))}
        </Slider>
      </Attractions>
    </Container>
  );
};
