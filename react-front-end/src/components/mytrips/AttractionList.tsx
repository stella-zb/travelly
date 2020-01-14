import React, { useState } from 'react';
import styled from 'styled-components';
import { Attraction } from './Attraction';
import { Button } from './Button';
import { InviteIcon } from './InviteIcon';
import addattr from '../../images/addpin.svg';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Attractions = styled.ul`
  padding-left: 0px;
`;

const AttractionItem = styled.li`
  text-decoration: none;
  list-style-type: none;
  padding: 25px;
`;

const Title = styled.h1`
  text-align: left;
`;

const AddAttr = styled.img`
  width: 35px;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 10%;
  padding-left: 10%;
`;

type PropTypes = {
  id: string,
  attractions: Array<any>,
  deleteAttraction: any,
  setInvite: any,
  generate: any
}

export const AttractionList = ({ id, attractions, deleteAttraction, setInvite, generate }: PropTypes) => {

  const [edit, setEdit] = useState<boolean>(false);

  const updateItinerary = () => {
    axios.get(`/api/itineraries/${id}`, {
      params: {
        user: localStorage.userID
      }
    })
    .then(() => {
      setEdit(true);
    })
  };


  return (
    <>
      {edit && <Redirect to={`/explore/${id}`} />}
      <Header>
        <Title>{attractions.length === 0 ? "Itinerary" : attractions[0].city}</Title>
        <Actions>
          <AddAttr src={addattr} onClick={updateItinerary} />
          <InviteIcon id={id} setInvite={setInvite} />
        </Actions>
      </Header>

      <Attractions>
        {attractions.map(attraction =>
          <AttractionItem key={attraction.id}>
            <Attraction
              id={attraction.attraction_id}
              name={attraction.name}
              img={attraction.photo}
              editable={true}
              deleteAttraction={deleteAttraction}
              submitter={attraction.first_name}
            />
          </AttractionItem>
        )}
      </Attractions>

      <Button text="Generate" click={generate} />
    </>
  )
}