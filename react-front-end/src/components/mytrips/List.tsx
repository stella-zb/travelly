import React from "react";
import { Attraction } from "./Attraction";
import location from "../../images/location.svg";
import walk from "../../images/walk.svg";
import bus from "../../images/bus.svg";
import car from "../../images/car.svg";
import styled from "styled-components";
import moment from "moment";

const Timeslot = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 5px;
  align-items: center;
`;

const ContentDiv = styled.div`
  width: 73%;
  text-align: center;
`;

const IconDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  align-items: center;
`;
const Icon = styled.img`
  width: 21px;
`;

const Container = styled.div`
  padding-top: 25px;
`;

const Copy = styled.p`
  font-size: 15px;
  margin-top: 7px;
`;

const Transit = styled.div`
  font-size: 13px;
  border-bottom: 1px dashed #8b8589;
  line-height: 0.1em;
`;

const Span = styled.span`
  background: #fcfcfc;
  padding: 0 10px;
`;

const getIcon = (type: string) => {
  if (type === "attraction") {
    return <Icon src={location} style={{ width: "35px" }} />;
  } else if (type === "WALKING") {
    return <Icon src={walk} />;
  } else if (type === "TRANSIT") {
    return <Icon src={bus} />;
  } else if (type === "CAR") {
    return <Icon src={car} />;
  }
};

type PropTypes = { timeslots: Array<any>; deleteAttraction: any; updateDuration: any; };

export const List = ({ timeslots, deleteAttraction, updateDuration }: PropTypes) => {
  const categorizeTimeslot = (slot: {
    id: number;
    attraction_id: number;
    name: string;
    photo: string;
    travel_mode: string;
    start_time: number;
    end_time: number;
    first_name: string | null;
    last_name: string | null;
    visit_duration: number;
  }) => {
    const start = moment.unix(slot.start_time);
    const end = moment.unix(slot.end_time);

    if (slot.attraction_id === null && slot.travel_mode == "WALKING") {
      return (
        <Timeslot key={slot.id}>
          <IconDiv>{getIcon("WALKING")}</IconDiv>
          <ContentDiv>
            <Transit>
              <Span>
                {end.diff(start, "minutes")} MINUTES BY {slot.travel_mode}
              </Span>
            </Transit>
          </ContentDiv>
        </Timeslot>
      );
    } else if (slot.attraction_id === null && slot.travel_mode == "TRANSIT") {
      return (
        <Timeslot key={slot.id}>
          <IconDiv>{getIcon("TRANSIT")}</IconDiv>
          <ContentDiv>
            <Transit>
              <Span>
                {end.diff(start, "minutes")} MINUTES BY {slot.travel_mode}
              </Span>
            </Transit>
          </ContentDiv>
        </Timeslot>
      );
    } else if (slot.attraction_id === null && slot.travel_mode == "CAR") {
      return (
        <Timeslot key={slot.id}>
          <IconDiv>{getIcon("CAR")}</IconDiv>
          <ContentDiv>
            <Transit>
              <Span>
                {end.diff(start, "minutes")} MINUTES BY {slot.travel_mode}
              </Span>
            </Transit>
          </ContentDiv>
        </Timeslot>
      );
    } else {
      return (
        <Timeslot key={slot.id}>
          <IconDiv>
            {getIcon("attraction")}
            <Copy>
              {moment
                .unix(slot.start_time)
                .utc()
                .format("hh:mm a")}
            </Copy>
          </IconDiv>
          <ContentDiv>
            <Attraction
              key={slot.id}
              id={slot.attraction_id}
              name={slot.name}
              img={slot.photo}
              editable={false}
              deleteAttraction={deleteAttraction}
              firstName={slot.first_name}
              lastName={slot.last_name}
              duration={slot.visit_duration}
              updateDuration={updateDuration}
            />
          </ContentDiv>
        </Timeslot>
      );
    }
  };

  return (
    <>
      <Container>{timeslots.map(slot => categorizeTimeslot(slot))}</Container>
    </>
  );
};
