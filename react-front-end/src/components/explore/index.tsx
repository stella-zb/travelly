import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import styled from 'styled-components';

import { SearchBar } from "./SearchBox";
import { DestRec } from "./DestRecommended";
import { AttractionList } from "./Attractions";


type ExploreProps = {
  cityName: string | null,
  selected?: string | null,
  topRecommended: string,
  search?: any
  
  // style?: React.CSSProperties | undefined
};



export const Explore: React.FC<ExploreProps> = () => {
  
    return (
      // <Router>
        <Switch>
          <Route exact path='/explore'>
            <SearchBar />
            <DestRec cityName="Van" topRecommended="Vancouver"/>
          </Route>
          <Route path={`/explore/:itinerariesId`} render={({match}) => (
            <AttractionList itinerariesId ={match.params.itinerariesId}/>)}/>
        </Switch>

      // </Router>
    )
}
