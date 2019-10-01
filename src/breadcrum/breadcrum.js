import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, NavLink, Redirect } from 'react-router-dom';
class Bread extends Component {
  state = {

  }
  render() {

    return (
      <section className="breadcrumb">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-3 col-md-6">
              <ul>
                <li><NavLink to="/" exact>Home / &nbsp; </NavLink></li>
                <li><NavLink to="/" exact> Profile </NavLink></li>

              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  }

}


export default Bread

