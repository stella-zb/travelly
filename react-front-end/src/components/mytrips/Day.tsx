import React from 'react';
import styled from 'styled-components';


type PropTypes = { number:string, selectDay:any, key:number, id:string, selected:string }

export const Day = ({ number, selectDay, selected }: PropTypes) => {
  const ItineraryDay = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    text-transform: uppercase;
  `
  const DayNum = styled.div`
    background: ${selected === number ? '#76BED0' : '#FFF'}
    border-radius: 50%;
    height: 25px;
    width: 25px;
    line-height: 25px;
    color: ${selected === number ? '#FFF' : 'inherit'};
    margin-top: 4px;
  `
  const DayText = styled.div`
    font-size: 13px;
    font-weight: ${selected === number && 'bold'};
    margin-bottom: 4px;
  `

  return (
    <ItineraryDay onClick={selectDay}>
      <DayText>Day</DayText>
      <DayNum>{number}</DayNum>
    </ItineraryDay>
  )
}