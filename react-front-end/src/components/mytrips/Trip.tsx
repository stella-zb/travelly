import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import axios from 'axios';
import { AttractionList } from './AttractionList';
import { Itinerary } from './Itinerary';
import { Redirect } from 'react-router';
import { Invite } from './Invite';
import styled from 'styled-components';
import spinner from '../../images/spinner.svg';

const Modal = styled.div`
    background: #FCFCFC;
    z-index: 9999999;
    height: 100vh;
    width: 100vw;
  `;

export const Trip = () => {
  const id: string = location.pathname.slice(location.pathname.lastIndexOf('/') + 1);
  const [timeslots, setTimeslots] = useState<Array<any>>([]);
  const [count, setCount] = useState(1);
  const [invite, setInvite] = useState<boolean>(false);
  const firstUpdate = useRef(true);
  const [loading, setLoading] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      setCount(timeslots.length);
    }
  });
  const checkItineraryExists = (attr: Array<any>) => {
    if (count === 0) {
      return <Redirect to='/trips' />;
    }
    for (let i = 0; i < attr.length; i++) {
      if (attr[i].start_time === null || attr[i].end_time === null) {        
        return <AttractionList
          id={id}
          attractions={timeslots}
          deleteAttraction={deleteAttraction}
          setInvite={() => setInvite(true)}
          generate={generate}
        />;
      }
    }
    return <Itinerary id={id} timeslots={timeslots} editAction={editAction} deleteAttraction={deleteAttraction} setInvite={() => setInvite(true)} />;
  };

  const deleteAttraction = (attrid: number) => {
    axios.delete(`/api/trips/${id}/attractions/${attrid}`)
      .then(() => loadData())
  }

  const loadData = () => {
    axios.get(`/api/trips/${id}`)
      .then((res) => {
        setTimeslots(res.data);
      })
  }

  const editAction = () => {
    axios.post(`/api/trips/${id}/edit`)
      .then(() => loadData())
  }

  const generate = (e: any) => {
    setLoading(true)
    axios.post(`/api/trips/${id}`)
      .then(() => loadData())
      .then(() => setLoading(false))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <>
      {loading && <Modal><img src={spinner} /><br />Loading...</Modal>}
      {invite ? <Invite trip={id} goBack={() => setInvite(false)} /> : checkItineraryExists(timeslots)}
    </>
  )
}