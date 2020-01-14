import React from 'react';
import { Attraction } from './Attraction';
import location from '../../images/location.svg';
import walk from '../../images/walk.svg';
import bus from '../../images/bus.svg';
import car from '../../images/car.svg';
import styled from 'styled-components';
import moment from 'moment';

const Timeslot = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 5px;
  align-items: center;
`

const ContentDiv = styled.div`
  width: 73%;
  text-align: center;
`

const IconDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  align-items: center;
`
const Icon = styled.img`
  width: 30px;
`

const Container = styled.div`
  height: calc(100vh + 120px);
  background: #EFFBFF;
  padding-top: 25px;
`

const Copy = styled.p`
  font-size: 13px;
`

const getIcon = (type:string) => {
  if (type === 'attraction') {
    return <Icon src={location} />
  } else if (type === 'WALKING') {
    return <Icon src={walk} />
  } else if (type === 'TRANSIT') {
    return <Icon src={bus} />
  } else if (type === 'CAR') {
    return <Icon src={car} />
  }
}

type PropTypes = { timeslots: Array<any>, deleteAttraction: any }

export const List = ({timeslots, deleteAttraction}: PropTypes) => {
  const categorizeTimeslot = (slot: {id:number, attraction_id:number, name:string, photo:string, travel_mode:string, start_time:number, end_time:number, lat:number, lng:number, first_name:string|null}) => {
    const start = moment.unix(slot.start_time);
    const end = moment.unix(slot.end_time);

    if (slot.attraction_id === null && slot.travel_mode == 'WALKING') {
      return <Timeslot key={slot.id}><IconDiv>{getIcon('WALKING')}</IconDiv><ContentDiv><Copy>{end.diff(start, 'minutes')} MINUTES BY {slot.travel_mode}</Copy></ContentDiv></Timeslot>
    } else if (slot.attraction_id === null && slot.travel_mode == 'TRANSIT') {
      return <Timeslot key={slot.id}><IconDiv>{getIcon('TRANSIT')}</IconDiv><ContentDiv><Copy>{end.diff(start, 'minutes')} MINUTES BY {slot.travel_mode}</Copy></ContentDiv></Timeslot>
    } else if (slot.attraction_id === null && slot.travel_mode == 'CAR') {
      return <Timeslot key={slot.id}><IconDiv>{getIcon('CAR')}</IconDiv><ContentDiv><Copy>{end.diff(start, 'minutes')} MINUTES BY {slot.travel_mode}</Copy></ContentDiv></Timeslot>
    } else {
      return <Timeslot key={slot.id}><IconDiv>{getIcon('attraction')}<Copy>{moment.unix(slot.start_time).utc().format('hh:mm a')}</Copy></IconDiv><ContentDiv><Attraction key={slot.id} id={slot.attraction_id} name={slot.name} img={slot.photo} editable={false} deleteAttraction={deleteAttraction} submitter={slot.first_name} /></ContentDiv></Timeslot>
    }
  };

  return (
    <>
    <Container>
      {timeslots.map(slot =>
        categorizeTimeslot(slot)
          )}
      </Container>
    </>
  )
}