import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, NavLink, Redirect } from 'react-router-dom';
class Header extends Component {
  state = {

  }


  render() {

    return (

      <div>

        <section className="header-main">
         
              <nav className="navbar ">
  <div className="container">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <a className="navbar-brand" href="#"> <i className="fa fa-meetup" aria-hidden="true"></i></a>
    </div>
    <div className="collapse navbar-collapse" id="myNavbar">
      
      <ul className="nav navbar-nav navbar-right">
      <li><a href="#"><span className=""></span> Healer</a></li>
        <li><a href="#"><span className="glyphicon"></span> Chat</a></li>
        <li><a href="#"><span className="fa fa-user-circle-o"></span> David User </a>
        </li>
        <div className="dropdown">
    <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
    <span className="fa fa-angle-down"></span></button>
    <ul className="dropdown-menu">
      <li><a href="#">HTML</a></li>
      <li><a href="#">CSS</a></li>
      <li><a href="#">JavaScript</a></li>
    </ul>
  </div>
        
      
      </ul>
    </div>
  </div>
</nav>
             
          
        </section>

      </div>

    )
  }

}


export default Header

