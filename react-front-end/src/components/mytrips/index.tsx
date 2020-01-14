import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import { CityList } from "./CityList";
import { Trip } from "./Trip";
import { Invite } from "./Invite";
import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 150px;
`;

export const TripsIndex = () => {
  return (
    <>
      <Container>
        <Switch>
          <Route exact path="/trips">
            <CityList />
          </Route>
          <Route path="/trips/:id">
            <Trip />
          </Route>
        </Switch>
      </Container>
    </>
  );
};
