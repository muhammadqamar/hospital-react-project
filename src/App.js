import React, { Component } from 'react';
import { BrowserRouter, Route, Switch,NavLink , Redirect } from 'react-router-dom';
import Appchild from './Appchild';


class App extends Component {

  render() {
  return (
     <BrowserRouter>
        <Switch>
        <Route path="/" exact strict render={
         () => {
           return (

             <Appchild   />

           );
         }
       }/>

<Route path="/login" exact strict render={
         () => {
           return (
            null

           );
         }
       }/>

          </Switch>
      
 </BrowserRouter>
    );
  }
}



export default App;
