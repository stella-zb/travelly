import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from "react-router-dom";
import './App.css';
import { TripsIndex } from './components/mytrips/index';
import styled from 'styled-components';
import useVisualMode from "./hooks/useVisualMode";
import { LoginInForm } from './components/auth/LoginInForm';
import { SignUpForm } from './components/auth/SignUpForm';
import { Profile } from './components/profile/profile';
import logo from "./images/logo.png";

const NavList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-left: 0px;
`;

import { Explore } from "./components/explore/index";
const NavItem = styled(NavLink)`
  text-decoration: none;
  color: #000;
`;

const NavDiv = styled.nav`
  position: fixed;
  bottom: 0px;
  width: 99%;
  z-index: 999;
  background: #F4F4F9;
  border: 1px solid #000;
  margin: 1px 1px 0px 1px;
`;

const Wrapper = styled.div`
  text-align: center;
`;

const Button = styled.button`
  margin: 20px;
  padding: 10px 40px
  border: none;
  background-color: #FCFCFC;

  &:hover {
    border-bottom: 2px solid #76BED0;
  }
`;

export default function App() {
  // class App extends Component <{}, {message: string}> {
  //   constructor(props: CityList) {
  //     super(props)
  //     this.state = {
  //       message: 'Click the button to load data!'
  //     }
  //   }

  //   fetchData = () => {
  //     axios.get('/api/data') // You can simply make your requests to "/api/whatever you want"
  //     .then((response) => {
  //       // handle success
  //       console.log(response.data) // The entire response from the Rails API

  //       console.log(response.data.message) // Just the message
  //       this.setState({
  //         message: response.data.message
  //       });
  //     }) 
  //   }

  // render() {
  // return (
  //   <div className="App">
  //     <h1>{ this.state.message }</h1>
  //     <button onClick={this.fetchData} >
  //       Fetch Data
  //     </button>        
  //   </div>
  // );
  // const INITIALIZE = 'INITIALIZE';
  const LOGIN = 'LOGIN';
  const SIGNUP = 'SIGNUP';

  const { mode, transition } = useVisualMode(
    LOGIN
    // INITIALIZE
  );

  const [user, setUser] = useState<number>(localStorage.userID);



  return (
    <div className="App">
      <Router>

        {user &&
          <NavDiv>
            <NavList>
              <li><NavItem to='/explore' activeStyle={{ fontWeight: 'bold', color: '#F55D3E' }}>Explore</NavItem></li>
              <li><NavItem to='/trips' activeStyle={{ fontWeight: 'bold', color: '#F55D3E' }}>My Trips</NavItem></li>
              <li><NavItem to='/profile' activeStyle={{ fontWeight: 'bold', color: '#F55D3E' }}>Profile</NavItem></li>
            </NavList>
          </NavDiv>}

        <Switch>
          {!user ? <>
            <Route path='/'>
              <Wrapper>
                <Button onClick={() => transition(LOGIN)}>Log In</Button>
                <Button onClick={() => transition(SIGNUP)}>Sign Up</Button>
              </Wrapper>
              {mode === LOGIN && <LoginInForm setLogin={() => setUser(localStorage.userID)} />}
              {mode === SIGNUP && <SignUpForm setLogin={() => setUser(localStorage.userID)} />}
              <img src={logo} style={{ width: '250px', position: 'relative', top: '40vh' }} />
            </Route>
          </>
            :
            <>
              <Redirect from="/" to="/explore" />
              <Route path='/explore'>
                <Explore
                  cityName='Van'
                  topRecommended="Vancouver"
                // selected=''
                />
              </Route>
              <Route path='/trips'>
                <TripsIndex />
              </Route>

              <Route path='/profile'>
                <Profile setLogout={() => setUser(null)} />
              </Route>
            </>}
        </Switch>
      </Router>
    </div>
  )
}



  // }


  // export default App;
