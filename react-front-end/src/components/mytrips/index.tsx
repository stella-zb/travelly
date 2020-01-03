import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import { CityList } from './CityList';
import { AttractionList } from './AttractionList';
import axios from 'axios';

export const TripsIndex = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get('/api/trips')
    ])
    .then((res) => {
      setTrips(res[0].data)
    })
  }, [])

  console.log('TRIPS', trips)
  return (
    <>
    <Router>
      <Switch>
        <Route exact path='/trips'><CityList cities={trips} /></Route>
        <Route exact path='/trips/vancouver'><AttractionList city="Vancouver" attractions="attractions" /></Route>
      </Switch>
    </Router>

    </>
  )
}