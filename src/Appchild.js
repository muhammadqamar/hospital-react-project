import React, { Component } from 'react';

import Footer from './footer/footer'
import Header from './header/header'
import Bread from './breadcrum/breadcrum'
import Formone from './formone/formone'
import { BrowserRouter, Route, Switch,NavLink , Redirect } from 'react-router-dom';



class Appchild extends Component {
  state ={
  
  }


render(){

return(
  <section>
     <Header />
     <Bread />
     <Formone />
  <Footer />
  </section>
)
}

}


export default Appchild

