import React, { Component } from 'react';


import { BrowserRouter, Route, Switch, NavLink, Redirect } from 'react-router-dom';



class Formone extends Component {
  state = {

  }


  render() {

    return (
      <div>


        <section className="formone">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-3 col-lg-2 ">
                <div className="block profile-photo">
                  <i className="fa fa-user-circle-o" ></i>
                  <div className="heading">Muhammad Qamar</div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-9 col-lg-10 ">
                <div className="block personal-detail">
                  <div className="heading">Personal details</div>

                  <div className="formcenter row">
                    <div className="col-xs-12 col-sm-6 col-md-4">
                      <div className="label">First Name</div>
                      <input value="" type="text" className="form-control" placeholder="Muhammad" />
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4">
                      <div className="label">Middle Name (Optional)</div>
                      <input value="" type="text" className="form-control" placeholder="Qamar" />
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4">
                      <div className="label">Last Name (Optional)</div>
                      <input value="" type="text" className="form-control" placeholder="Aftab" />
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4">
                      <div className="label">date of birth</div>
                      <input value="" type="Calender" className="form-control" placeholder="Qamar" />
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4">
                      <div className="label">Email</div>
                      <input value="" type="Email" className="form-control" placeholder="Qamar@gmail.com" />
                    </div>

                    <div className="col-xs-12 col-sm-6 col-md-4">
                      <div className="label">Mobile</div>
                      <input value="" type="text" className="form-control" placeholder="+923464198330" />
                    </div>
                  </div>
                </div>



                <div className="block uplaod">
                  <div className="heading">Upload Documents</div>

                  <div className="formcenter row">
                    <div className="col-xs-12 ">
                      <div className="label">select & upload documents</div>
                      <ul className="nav nav-tabs">
                        <li className="active"><a data-toggle="tab" href="#home">aadhar card</a></li>
                        <li><a data-toggle="tab" href="#menu1">PAN card</a></li>
                        <li><a data-toggle="tab" href="#menu2">Passport</a></li>
                      </ul>

                      <div className="tab-content">
                        <div id="home" className="tab-pane fade in active">
                          <div className="blockinput">
                            <input type="file" style={{display:'none'}}  ref={g=>this.qamar= g} className="" />
                            <i className="fa fa-file"></i> Drag & srop files or <span onClick={()=>this.qamar.click()}> BROWSER </span>
                            </div>
                            <ul className="uplaoded files">
                              <li class="blocker">
                                <i className="fa fa-file"></i> Consumpltion.png
                                </li>

                                <li class="blocker">
                                <i className="fa fa-file"></i> image.png
                                </li>
                              </ul>
                        </div>
                        <div id="menu1" className="tab-pane fade">
                        <div className="blockinput">
                            <input type="file" style={{display:'none'}}  ref={g=>this.qamar= g} className="" />
                            <i className="fa fa-file"></i> Drag & srop files or <span onClick={()=>this.qamar.click()}> BROWSER </span>
                            </div>
                            <ul className="uplaoded files">
                              <li class="blocker">
                                <i className="fa fa-file"></i> Consumpltion.png
                                </li>

                                <li class="blocker">
                                <i className="fa fa-file"></i> image.png
                                </li>
                              </ul>
                        </div>
                        <div id="menu2" className="tab-pane fade">
                        <div className="blockinput">
                            <input type="file" style={{display:'none'}}  ref={g=>this.qamar= g} className="" />
                            <i className="fa fa-file"></i> Drag & srop files or <span onClick={()=>this.qamar.click()}> BROWSER </span>
                            </div>
                            <ul className="uplaoded files">
                              <li class="blocker">
                                <i className="fa fa-file"></i> Consumpltion.png
                                </li>

                                <li class="blocker">
                                <i className="fa fa-file"></i> image.png
                                </li>
                              </ul>
                        </div>
                      </div>

                    </div>




                  </div>
                </div>


                <div className="block personal-detail">
                  <div className="heading">Contact Details</div>

                  <div className="formcenter row">
                    <div className="col-xs-12 col-sm-6 col-md-4">
                      <div className="label">pincode</div>
                      <input value="" type="text" className="form-control" placeholder="404400" />
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4">
                      <div className="label">City</div>
                      <input value="" type="text" className="form-control" placeholder="New york" />
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4">
                      <div className="label">State</div>
                      <input value="" type="text" className="form-control" placeholder="Ohio" />
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4">
                      <div className="label">country</div>
                      <input value="" type="text" className="form-control" placeholder="USA" />
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4">
                      <div className="label">address</div>
                      <input value="" type="type" className="form-control" placeholder="city abc state xyz" />
                    </div>

                    
                  </div>
                </div>
                <div class="block submit">
                  <div class="btn btn-default">Submit</div>
                  <div class="btn btn-default">Reset</div>
                </div>






              </div>
            </div>




          </div>


        </section>
      </div>
    )
  }

}


export default Formone

