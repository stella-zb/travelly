import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Click the button to load data!'
    }
  }

  fetchData = () => {
    axios.get('/api/data') // You can simply make your requests to "/api/whatever you want"
    .then((response) => {
      // handle success
      console.log(response.data) // The entire response from the Rails API

      console.log(response.data.message) // Just the message
      this.setState({
        message: response.data.message
      });
    }) 
  }

  render() {
    // return (
    //   <div className="App">
    //     <h1>{ this.state.message }</h1>
    //     <button onClick={this.fetchData} >
    //       Fetch Data
    //     </button>        
    //   </div>
    // );
    return (
      <Router>
        <nav>
          <ul>
            <li><Link to='/'>Explore</Link></li>
            <li><Link to='/trips'>My Trips</Link></li>
            <li><Link to='/'>Profile</Link></li>
          </ul>
        </nav>

        <Switch>
          <Route path='/login'>
            log in from App.js
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App;
