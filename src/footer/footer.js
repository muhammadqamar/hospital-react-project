import React, { Component } from 'react';

import { BrowserRouter, Route, Switch,NavLink , Redirect } from 'react-router-dom';




class Footer extends Component {
  state ={
  
  }


render(){

return(
  <div>
  <section className="footer-mian">
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-3 col-md-6">
          <div className="logofooter">
          <i className="fa fa-meetup" aria-hidden="true"></i>
             
          </div>
          </div>
          <div className="col-xs-12 col-sm-3 col-lg-2">
          <div className="block">
             <div className="heading">For Seller</div>
             <ul className="List">
               <li><NavLink to="/" exact >Lorium ipsum</NavLink></li>
               <li><NavLink to="/" exact >Lorium ipsum</NavLink></li>
               <li><NavLink to="/" exact >Lorium ipsum</NavLink></li>
               <li><NavLink to="/" exact >Lorium ipsum</NavLink></li>
               <li><NavLink to="/" exact >Lorium ipsum</NavLink></li>
               <li><NavLink to="/" exact >Lorium ipsum</NavLink></li>
               <li><NavLink to="/" exact >Lorium ipsum</NavLink></li>
               <li><NavLink to="/" exact >Lorium ipsum</NavLink></li>

               </ul>
          </div>
          </div>
          <div className="col-xs-12 col-sm-3 col-lg-2">
          <div className="block">
             <div className="heading">For Healer</div>
             <ul className="List">
               <li><NavLink to="/" exact >Lorium ipsum</NavLink></li>
               <li><NavLink to="/" exact >Lorium ipsum</NavLink></li>
               <li><NavLink to="/" exact >Lorium ipsum</NavLink></li>
               <li><NavLink to="/" exact >Lorium ipsum</NavLink></li>
               <li><NavLink to="/" exact >Lorium ipsum</NavLink></li>
               <li><NavLink to="/" exact >Lorium ipsum</NavLink></li>
               <li><NavLink to="/" exact >Lorium ipsum</NavLink></li>
               <li><NavLink to="/" exact >Lorium ipsum</NavLink></li>
               
               </ul>
          </div>
          </div>
          <div className="col-xs-12 col-sm-3 col-lg-2">
          <div className="block">
             <div className="heading">Social</div>
             <ul className="List">
               <li><NavLink to="/" exact >facebook</NavLink></li>
               <li><NavLink to="/" exact >twitter</NavLink></li>
               <li><NavLink to="/" exact >Linkedin</NavLink></li>
               <li><NavLink to="/" exact >Youtube</NavLink></li>
               <li><NavLink to="/" exact >Github</NavLink></li>
               
               
               </ul>
          </div>
          </div>
        </div>

     
    </div>
    
    </section>

   <section className="copyright">
    <div className="container">
      <div className="row">
        <div className="col-xs-12 ">
          <div className="copy"> Copyright ©  2019, WellnessChakra. All right reserved</div>
          </div>
          </div>
          </div>
          </section>

    </div>
)
}

}


export default Footer

