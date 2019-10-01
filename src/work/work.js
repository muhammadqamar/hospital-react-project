import React, { Component } from 'react';
import $ from "jquery";
import slick from "slick-carousel";
import "slick-carousel/slick/slick.css";
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt} from 'react-router-dom';
import { connect } from "react-redux";
import './work.css';
import client from '../elastic';
import validator from 'validator';
import  Swal from  'sweetalert2'


//variable decleration
var allregistereduser =[]
var dummyjson=[]
var all_predefine =[]
var  testeryhn
var setcurrent
var namelogin
  var sliderarray = []
var portion_slider = []
var check_button=false
var resutl_api
var input_age
var input_profession
var all_search_result_api =[]
var all_search_stored_imgs =[]
var update_recom =[]
var final_recom =[]
var final_recom_one =[]
var all_view =[]

//main info of client 
var  user_deatls ={
 "Browser_CodeName" : navigator.appCodeName,
 "Browser_Name": navigator.appName,
 "Browser_Version": navigator.appVersion,
 "Cookies_Enabled": navigator.cookieEnabled,
 "Browser_Language": navigator.language,
 "Browser_Online": navigator.onLine,
 "Platform": navigator.platform,
 "User_agent_header": navigator.userAgent,
 }

// component class
class work extends Component {

 //statefull 
state = {

    sli:"",
    userdetail:"",
    name:"",
    register:{
      email:"",
      password:"",
      address:"",
      color:['#c99947'],
 
      top_size:12,
      jeans_size:45,
      shoes_size:9,
      age:"15-20",
      profession:"Engineer"
    }
  }

email_assign =  (e)=>{

this.setState({
        register:{
            ...this.state.register,
            email:e.target.value,
        }
        })
}

password_assign =  (e)=>{

    this.setState({
        register:{
             ...this.state.register,
            password:e.target.value,  
        }
        })
     
}
loginenter=  (e)=>{

  if(this.state.register.email == "" || this.state.register.password == "" ){
   
    Swal.fire("kindly fill all fields")
    return
  }
  if(!validator.isEmail(this.state.register.email)){
   
  Swal.fire("invalid Email")
  return
}
    console.log(this.state.register)
    var all_emails =[];

    var allemialcheck =  new Promise((res,rej)=>{
        client.search({
            index: 'allusers',
            size:1000
        
           
          },function (error, response,status) {
                  response.hits.hits.forEach(function(hit){
                    all_emails.push(hit._source.email)
                   
                  })
                  res()
             
              })

    })
    allemialcheck.then(c=>{
        var dummyname = this.state.name
        var dummyemail = this.state.register.email
        if(! all_emails.includes(this.state.register.email) ){

            client.index({
              index: 'allusers',
         
              body: this.state.register
          }, function(error, response,status) {
          
          if(!error){
             console.log(response)
              Swal.fire('user created')
           
                window.localStorage.setItem("token",response._id);
             window.localStorage.setItem("emial",dummyemail);
            
         

              client.search({
                index: 'likedoutfits',
            
                body: {
                  query: {
                    match: {
                      user_emial: dummyname
                    }
                  },
                }
              },function (error, response,status) {
                var allidsliked= []
                try{
                      response.hits.hits.forEach(function(hit){
                        allidsliked.push(hit._id)
          
                      })
                      console.log(allidsliked)
                      allidsliked.map(g=>{

                        var param = { index: 'likedoutfits',  id : g, body: {doc:{user_emial:dummyemail}, doc_as_upsert: true
                      }};
                      
                      client.update(param,function(err,results) {
                                console.log(results)
                      })
                      })
                     
                        
                    }catch(e){}
          
                  })


                  //dislkke update
                  client.search({
                    index: 'dislikedoutfits',
                 
                    body: {
                      query: {
                        match: {
                          user_emial: dummyname
                        }
                      },
                    }
                  },function (error, response,status) {
                   
                      var allidsdisliked= []
                      try{
                            response.hits.hits.forEach(function(hit){
                              allidsdisliked.push(hit._id)
                
                            })
                            console.log(allidsdisliked)

                            allidsdisliked.map(g=>{

                              var param = { index: 'dislikedoutfits',  id : g, body: {doc:{user_emial:dummyemail}, doc_as_upsert: true
                            }};
                            
                            client.update(param,function(err,results) {
                                      console.log(results)
                            })
                            })
                          }catch(e){}
              
                      })


              
          }
          });
          this.props.title()
          }
          
          else{
          
              Swal.fire('user already exist')
          }
    })

}
componentWillMount(){


 
// chack if user is logib depend on token then create a session

if(window.localStorage.token != undefined){
 
 


        this.setState({
        
          name:window.localStorage.email
        })
     
     
      
     
     }

//get all registered user start


  client.search({
    index: 'allusers',

   
  },function (error, response,status) {
          response.hits.hits.forEach(function(hit){
            allregistereduser.push(hit._source)

          })

      })


//store assigning props to work component
  sliderarray=[]
   input_profession = this.props.all_t.profession
  input_age = this.props.all_t.age
 
  
  //fetching on profession and age only currently
  
  fetch('/api/result/'+input_profession+'/'+input_age).then(x=>x.json().then(b=>{
    b.map(x=>{
    update_recom.push({
      "term":{
        "outfit.productID.keyword": {
              "value": x.term,
              "boost": x.weight
            }
      }

    })


    })

  fetch('/api/resultid/'+JSON.stringify(update_recom)).then(n=>n.json().then(m=>
    {
final_recom_one =[]
   testeryhn = new Promise((res,rej)=> {

m.map(k=>{
  if(k._source.age == input_age && k._source.profession==input_profession){

   final_recom.push(k._source.outfit)
   for(var k1=0;k1<k._source.outfit.length;k1++){
      final_recom_one.push(k._source.outfit[k1])
   }
}
})
this.props.onadditemrecom()
res()
})
//search loop on includes
testeryhn.then(j=>{
  console.log(final_recom_one)
for(var k2=0;k2<final_recom_one.length;k2++)
  {
    console.log(final_recom_one[k2])
 client.search({
      index: 'allproducts',
      type: 'posts',
      body: {
        query: {
          match: {
            _id: final_recom_one[k2].productID
          }
        },
      }
    },function (error, response,status) {
            response.hits.hits.forEach(function(hit){
all_predefine.push(hit)

            })

        })

  }
})
//sear loop on ids end

}))

}))



  client.search({
     index: 'allproducts',
     type: 'posts',
     body: {
       from : 0, "size" : 10000,
       query: {
         match_all: {}
       },
     }
   },function (error, response,status) {
       if (error){
      //   console.log("search error: "+error)
       }
       else {
        // console.log("--- Response ---");
        // console.log(response);
        // console.log("--- Hits ---");
         response.hits.hits.forEach(function(hit){
         all_search_stored_imgs.push(hit._source.img)

         })
       }
   });
  fetch('https://api.ipgeolocation.io/ipgeo?apiKey=1a8260d6d26d48c6bded145efcfe7ced').then(x=>x.json().then(b=>  {
    resutl_api = b
    
    if(window.localStorage.token == undefined){
 


      var username = this.props.all_t.age +  this.props.all_t.profession + user_deatls.Browser_Name  + resutl_api.ip 
      console.log(username)
         this.setState({
         
           name:username
         })
      
      
       
      
      }
  }))
}
componentDidMount()
  {
    console.log(this)
 

    this.setState({
      register:{
           ...this.props.all_t,
          
      }
      })
      console.log(this.state)
   
   


console.log("i am mount")
try{
      document.getElementsByClassName('loader')[0].style.display="block"
    }catch(e){}
  var shoes= []
  var jeans = []
  var bags = []
  var shirts =[]
  var pants = []
  var tops = []
  var skirts = []
  var handbags =[]
  var earings =[]
  var dress =[]
  var necklace =[]

var promisefirst = ()=>{
return  new Promise((resolve,reject)=>{
  fetch("https://search-api.swiftype.com/api/v1/public/engines/search.json?engine_key=fSPw6wk-GVaeu9fz5sUU&q=jeans").then(x=>x.json().then(b=>{

    for(var x =0;x<b.records.page.length;x++){
      var price="NA"
      try{
      var description = b.records.page[x].description
      var check = description.split(',')[description.split(',').length-1].split(':')[1]
      var check_prize = description.split(',')[description.split(',').length-1]

      if (check_prize.includes('Price'))
      {
        price = "US $ "+check
      }
      else{
        price = "NA"
      }
        }catch(e){}
      var dummy = {
        img:b.records.page[x].image,
        price:price,

        description:description,
        type:'jeans'
      }
      if(b.records.page[x].image.includes('forever21') &&  !b.records.page[x].image.includes('warning')){
    jeans.push(dummy)
  }
    }
    //document.getElementsByClassName('loader')[0].style.display="none"
    resolve()
  }))

})
}
var promisesecond = ()=>{
  return new Promise((resolve,reject)=>{

fetch("https://search-api.swiftype.com/api/v1/public/engines/search.json?engine_key=fSPw6wk-GVaeu9fz5sUU&q=shirts").then(x=>x.json().then(b=>{

  for(var x =0;x<b.records.page.length;x++){
    var price="NA"
    try{
    var description = b.records.page[x].description
    var check = description.split(',')[description.split(',').length-1].split(':')[1]
    var check_prize = description.split(',')[description.split(',').length-1]

    if (check_prize.includes('Price'))
    {
      price = "US $ "+check
    }
    else{
      price = "NA"
    }
  }catch(e){}
    var dummy = {
      img:b.records.page[x].image,
      price:price,
description:description,
    type:'shirts'
    }
  if(b.records.page[x].image.includes('forever21') &&  !b.records.page[x].image.includes('warning')){
  shirts.push(dummy)
}
  }
  //document.getElementsByClassName('loader')[0].style.display="none"
    resolve()
}))
})
}
var promisethird =  ()=>{
return new Promise((resolve,reject)=>{

  fetch("https://search-api.swiftype.com/api/v1/public/engines/search.json?engine_key=fSPw6wk-GVaeu9fz5sUU&q=shoes").then(x=>x.json().then(b=>{

    for(var x =0;x<b.records.page.length;x++){
      var price="NA"
      var description = b.records.page[x].description
      var check = description.split(',')[description.split(',').length-1].split(':')[1]
      var check_prize = description.split(',')[description.split(',').length-1]

      if (check_prize.includes('Price'))
      {
        price = "US $ "+check
      }
      else{
        price = "NA"
      }
      var dummy = {
        img:b.records.page[x].image,
        price:price,
description:description,
    type:'shoes'
      }

    if(b.records.page[x].image.includes('forever21') &&  !b.records.page[x].image.includes('warning')){
    shoes.push(dummy)
  }
    }
  //  document.getElementsByClassName('loader')[0].style.display="none"
  resolve()
  }))

})
}
var promisefour =()=>{
  return  new Promise((resolve,reject)=>{

  fetch("https://search-api.swiftype.com/api/v1/public/engines/search.json?engine_key=fSPw6wk-GVaeu9fz5sUU&q=bags").then(x=>x.json().then(b=>{

    for(var x =0;x<b.records.page.length;x++){
      var price="NA"
      try{
      var description = b.records.page[x].description
      var check = description.split(',')[description.split(',').length-1].split(':')[1]
      var check_prize = description.split(',')[description.split(',').length-1]

      if (check_prize.includes('Price'))
      {
        price = "US $ "+check
      }
      else{
        price = "NA"
      }
        }catch(e){}
      var dummy = {
        img:b.records.page[x].image,
        price:price,
description:description,
    type:'bags'
      }
    if(b.records.page[x].image.includes('forever21') &&  !b.records.page[x].image.includes('warning')){
    bags.push(dummy)
  }
    }

  resolve()
  }))

})
}
var promisefive =()=>{
  return  new Promise((resolve,reject)=>{

  fetch("https://search-api.swiftype.com/api/v1/public/engines/search.json?engine_key=fSPw6wk-GVaeu9fz5sUU&q=tops").then(x=>x.json().then(b=>{

    for(var x =0;x<b.records.page.length;x++){
      var price="NA"
      try{
      var description = b.records.page[x].description
      var check = description.split(',')[description.split(',').length-1].split(':')[1]
      var check_prize = description.split(',')[description.split(',').length-1]

      if (check_prize.includes('Price'))
      {
        price = "US $ "+check
      }
      else{
        price = "NA"
      }
        }catch(e){}
      var dummy = {
        img:b.records.page[x].image,
        price:price,
description:description,
    type:'tops'
      }
    if(b.records.page[x].image.includes('forever21') &&  !b.records.page[x].image.includes('warning')){
    tops.push(dummy)
  }
    }

  resolve()
  }))

})
}
var promisesix =()=>{
  return  new Promise((resolve,reject)=>{

  fetch("https://search-api.swiftype.com/api/v1/public/engines/search.json?engine_key=fSPw6wk-GVaeu9fz5sUU&q=skirts").then(x=>x.json().then(b=>{

    for(var x =0;x<b.records.page.length;x++){
      var price="NA"
      try{
      var description = b.records.page[x].description
      var check = description.split(',')[description.split(',').length-1].split(':')[1]
      var check_prize = description.split(',')[description.split(',').length-1]

      if (check_prize.includes('Price'))
      {
        price = "US $ "+check
      }
      else{
        price = "NA"
      }
        }catch(e){}
      var dummy = {
        img:b.records.page[x].image,
        price:price,
description:description,
    type:'skirts'
      }
    if(b.records.page[x].image.includes('forever21') &&  !b.records.page[x].image.includes('warning')){
    skirts.push(dummy)
  }
    }

  resolve()
  }))

})
}
var promiseseven =()=>{
  return  new Promise((resolve,reject)=>{

  fetch("https://search-api.swiftype.com/api/v1/public/engines/search.json?engine_key=fSPw6wk-GVaeu9fz5sUU&q=handbags").then(x=>x.json().then(b=>{

    for(var x =0;x<b.records.page.length;x++){
      var price="NA"
      try{
      var description = b.records.page[x].description
      var check = description.split(',')[description.split(',').length-1].split(':')[1]
      var check_prize = description.split(',')[description.split(',').length-1]

      if (check_prize.includes('Price'))
      {
        price = "US $ "+check
      }
      else{
        price = "NA"
      }
        }catch(e){}
      var dummy = {
        img:b.records.page[x].image,
        price:price,
description:description,
    type:'handbags'
      }
    if(b.records.page[x].image.includes('forever21') &&  !b.records.page[x].image.includes('warning')){
    handbags.push(dummy)
  }
    }

  resolve()
  }))

})
}
var promiseeight =()=>{
  return  new Promise((resolve,reject)=>{

  fetch("https://search-api.swiftype.com/api/v1/public/engines/search.json?engine_key=fSPw6wk-GVaeu9fz5sUU&q=earings").then(x=>x.json().then(b=>{

    for(var x =0;x<b.records.page.length;x++){
      var price="NA"
      try{
      var description = b.records.page[x].description
      var check = description.split(',')[description.split(',').length-1].split(':')[1]
      var check_prize = description.split(',')[description.split(',').length-1]

      if (check_prize.includes('Price'))
      {
        price = "US $ "+check
      }
      else{
        price = "NA"
      }
        }catch(e){}
      var dummy = {
        img:b.records.page[x].image,
        price:price,
description:description,
    type:'earings'
      }
    if(b.records.page[x].image.includes('forever21') &&  !b.records.page[x].image.includes('warning')){
    earings.push(dummy)
  }
    }

  resolve()
  }))

})
}
var promisenine =()=>{
  return  new Promise((resolve,reject)=>{

  fetch("https://search-api.swiftype.com/api/v1/public/engines/search.json?engine_key=fSPw6wk-GVaeu9fz5sUU&q=dress").then(x=>x.json().then(b=>{

    for(var x =0;x<b.records.page.length;x++){
      var price="NA"
      try{
      var description = b.records.page[x].description
      var check = description.split(',')[description.split(',').length-1].split(':')[1]
      var check_prize = description.split(',')[description.split(',').length-1]

      if (check_prize.includes('Price'))
      {
        price = "US $ "+check
      }
      else{
        price = "NA"
      }
        }catch(e){}
      var dummy = {
        img:b.records.page[x].image,
        price:price,
description:description,
    type:'dress'
      }
    if(b.records.page[x].image.includes('forever21') &&  !b.records.page[x].image.includes('warning')){
    dress.push(dummy)
  }
    }

  resolve()
  }))

})
}
var promiseten =()=>{
  return  new Promise((resolve,reject)=>{

  fetch("https://search-api.swiftype.com/api/v1/public/engines/search.json?engine_key=fSPw6wk-GVaeu9fz5sUU&q=necklace").then(x=>x.json().then(b=>{

    for(var x =0;x<b.records.page.length;x++){
      var price="NA"
      try{
      var description = b.records.page[x].description
      var check = description.split(',')[description.split(',').length-1].split(':')[1]
      var check_prize = description.split(',')[description.split(',').length-1]

      if (check_prize.includes('Price'))
      {
        price = "US $ "+check
      }
      else{
        price = "NA"
      }
        }catch(e){}
      var dummy = {
        img:b.records.page[x].image,
        price:price,
description:description,
    type:'nacklace'
      }
    if(b.records.page[x].image.includes('forever21') &&  !b.records.page[x].image.includes('warning')){
    necklace.push(dummy)
  }
    }

  resolve()
  }))

})
}
var promiseelleven = ()=>{
return  new Promise((resolve,reject)=>{
  fetch("https://search-api.swiftype.com/api/v1/public/engines/search.json?engine_key=fSPw6wk-GVaeu9fz5sUU&q=pants").then(x=>x.json().then(b=>{

    for(var x =0;x<b.records.page.length;x++){
      var price="NA"
      try{
      var description = b.records.page[x].description
      var check = description.split(',')[description.split(',').length-1].split(':')[1]
      var check_prize = description.split(',')[description.split(',').length-1]

      if (check_prize.includes('Price'))
      {
        price = "US $ "+check
      }
      else{
        price = "NA"
      }
        }catch(e){}
      var dummy = {
        img:b.records.page[x].image,
        price:price,
description:description,
    type:'pants'
      }
      if(b.records.page[x].image.includes('forever21') &&  !b.records.page[x].image.includes('warning')){
    pants.push(dummy)
  }
    }
    //document.getElementsByClassName('loader')[0].style.display="none"
    resolve()
  }))

})
}


/*Promise.all(promisefirst(),promisesecond(),promisethird(),promisefour())
promisefirst().then(()=>{

  return promisesecond()
}).then(()=>{

  return promisethird()
}).then(()=>{

  return promisefour()
})*/

Promise.all([promisefirst(),promisesecond(),promisethird(),promisefour(),promisefive(),promisesix(),promiseseven(),promiseeight(),promisenine(),promiseten(),promiseelleven()]).then(()=>{
 // setTimeout(function(){  setcurrent(); }, 5000);
//spider
var finalfetch = new Promise((res,rej)=>{
  console.log(all_predefine)
  var all_predefine1=[]
  var checkbol =  true
  final_recom_one.map(we=>{
    checkbol = true
  all_predefine.map(we1=>{
    if(we.productID == we1._id && checkbol)
    {
      all_predefine1.push(we1._source)
      checkbol = false
    }
  })
  })
  console.log(all_predefine1)
  for(var n= 0;n<all_predefine.length;n=n+4)
  {

    sliderarray.push(
       <div className="">

          <div className="col-xs-6 col-sm-3  mobile-collpase">
              <div className="banner-text style2">
                  <div className="image">

                      <a className="banner-opacity" href="#"><img src={all_predefine1[n].img} alt="" /></a>
                  </div>
                  <div className="content-text">
                      <h3 className="title">{all_predefine1[n].price}</h3>
                        <h4 className="title hidden">{all_predefine1[n].description}</h4>
                          <h5 className="title hidden">{all_predefine1[n].type}</h5>
                    </div>
                  <div className="content-text2">
                        <h6 className="title extra">Fav</h6>
                  </div>
              </div>
          </div>
          <div className="col-xs-6 col-sm-3   mobile-collpase">
              <div className="banner-text style2">
                  <div className="image">
                      <a className="banner-opacity" href="#"><img src={all_predefine1[n+1].img} alt="" /></a>
                  </div>
                  <div className="content-text">
                      <h3 className="title">{all_predefine1[n+1].price}</h3>
                      <h4 className="title hidden">{all_predefine1[n+1].description}</h4>
                      <h5 className="title hidden">{all_predefine1[n+1].type}</h5>
                  </div>
                  <div className="content-text2">
                        <h6 className="title extra">Fav</h6>
                  </div>
              </div>

          </div>
         <div className="col-xs-6 col-sm-3   mobile-collpase">
          <div className="banner-text style2">
              <div className="image ">
                  <a className="banner-opacity" href="#"><img src={all_predefine1[n+2].img} alt="" /></a>
              </div>
              <div className="content-text">
                  <h3 className="title">{all_predefine1[n+2].price}</h3>
                  <h4 className="title hidden">{all_predefine1[n+2].description}</h4>
                  <h5 className="title hidden">{all_predefine1[n+2].type}</h5>
              </div>
              <div className="content-text2">
                    <h6 className="title extra">Fav</h6>
              </div>
          </div>
          </div>
          <div className=" col-xs-6 col-sm-3 mobile-collpase">
              <div className="banner-text style2">
                  <div className="image">
                      <a className="banner-opacity" href="#"><img src={all_predefine1[n+3].img} alt="" /></a>
                  </div>
                  <div className="content-text">
                      <h3 className="title">{all_predefine1[n+3].price}</h3>
                      <h4 className="title hidden">{all_predefine1[n+3].description}</h4>
                        <h5 className="title hidden">{all_predefine1[n+3].type}</h5>
                  </div>
              </div>
              <div className="content-text2">
                    <h6 className="title extra">Fav</h6>
              </div>
          </div>

          </div>
    )

  }

fetch('/api/resultmiddle/').then(x=>x.json().then(b=>{

console.log(b)

for(var n1= 0;n1<b.length;n1=n1+4)
{
console.log(b[n1].img)
  sliderarray.push(
     <div className="">

        <div className="col-xs-6 col-sm-3  mobile-collpase">
            <div className="banner-text style2">
                <div className="image">

                    <a className="banner-opacity" href="#"><img src={b[n1].img} alt="" /></a>
                </div>
                <div className="content-text ">
                    <h3 className="title">{b[n1].price}</h3>
                      <h4 className="title hidden">{b[n1].description}</h4>
                        <h5 className="title hidden">{b[n1].type}</h5>
                  </div>
                <div className="content-text2 gh">
                      <h6 className="title extra gh">LIKE</h6>
                </div>
            </div>
        </div>
        <div className="col-xs-6 col-sm-3   mobile-collpase">
            <div className="banner-text style2">
                <div className="image">
                    <a className="banner-opacity" href="#"><img src={b[n1+1].img} alt="" /></a>
                </div>
                <div className="content-text ">
                    <h3 className="title">{b[n1+1].price}</h3>
                    <h4 className="title hidden">{b[n1+1].description}</h4>
                    <h5 className="title hidden">{b[n1+1].type}</h5>
                </div>
                <div className="content-text2 gh">
                      <h6 className="title extra gh">LIKE</h6>
                </div>
            </div>

        </div>
       <div className="col-xs-6 col-sm-3   mobile-collpase">
        <div className="banner-text style2">
            <div className="image ">
                <a className="banner-opacity" href="#"><img src={b[n1+2].img} alt="" /></a>
            </div>
            <div className="content-text">
                <h3 className="title">{b[n1+2].price}</h3>
                <h4 className="title hidden">{b[n1+2].description}</h4>
                <h5 className="title hidden">{b[n1+2].type}</h5>
            </div>
            <div className="content-text2 gh">
                  <h6 className="title extra gh">LIKE</h6>
            </div>
        </div>
        </div>
        <div className=" col-xs-6 col-sm-3 mobile-collpase">
            <div className="banner-text style2">
                <div className="image">
                    <a className="banner-opacity" href="#"><img src={b[n1+3].img} alt="" /></a>
                </div>
                <div className="content-text">
                    <h3 className="title">{b[n1+3].price}</h3>
                    <h4 className="title hidden">{b[n1+3].description}</h4>
                      <h5 className="title hidden">{b[n1+3].type}</h5>
                </div>
            </div>
            <div className="content-text2 gh">
                  <h6 className="title extra ">LIKE</h6>
            </div>
        </div>

        </div>
  )

}
res()

}))

})

//spider end

finalfetch.then(hh=>{


  for(var x=0;x<8;x++){


  var min = 0;
  var max = Math.min(necklace.length,dress.length,earings.length,handbags.length,skirts.length,shoes.length,jeans.length,bags.length,shoes.length,tops.length)-1
  if(max<0){
    //alert('no querries result found')
  }
  var rand_nu = Math.floor(Math.random() * (max - min + 1)) + min;
  sliderarray.push(
     <div className="">

        <div className="col-xs-6 col-sm-3  mobile-collpase">
            <div className="banner-text style2">
                <div className="image">

                    <a className="banner-opacity" href="#"><img src={tops[rand_nu].img} alt="" /></a>
                </div>
                <div className="content-text">
                    <h3 className="title">{tops[rand_nu].price}</h3>
                      <h4 className="title hidden">{tops[rand_nu].description}</h4>
                        <h5 className="title hidden">{tops[rand_nu].type}</h5>
                </div>
            </div>
        </div>
        <div className="col-xs-6 col-sm-3   mobile-collpase">
            <div className="banner-text style2">
                <div className="image">
                    <a className="banner-opacity" href="#"><img src={skirts[rand_nu].img} alt="" /></a>
                </div>
                <div className="content-text">
                    <h3 className="title">{skirts[rand_nu].price}</h3>
                    <h4 className="title hidden">{skirts[rand_nu].description}</h4>
                    <h5 className="title hidden">{skirts[rand_nu].type}</h5>
                </div>
            </div>

        </div>
       <div className="col-xs-6 col-sm-3   mobile-collpase">
        <div className="banner-text style2">
            <div className="image ">
                <a className="banner-opacity" href="#"><img src={bags[rand_nu].img} alt="" /></a>
            </div>
            <div className="content-text">
                <h3 className="title">{bags[rand_nu].price}</h3>
                <h4 className="title hidden">{bags[rand_nu].description}</h4>
                <h5 className="title hidden">{bags[rand_nu].type}</h5>
            </div>
        </div>
        </div>
        <div className=" col-xs-6 col-sm-3 mobile-collpase">
            <div className="banner-text style2">
                <div className="image">
                    <a className="banner-opacity" href="#"><img src={shoes[rand_nu].img} alt="" /></a>
                </div>
                <div className="content-text">
                    <h3 className="title">{shoes[rand_nu].price}</h3>
                    <h4 className="title hidden">{shoes[rand_nu].description}</h4>
                      <h5 className="title hidden">{shoes[rand_nu].type}</h5>
                </div>
            </div>
        </div>

        </div>
  )

  var rand_nu = Math.floor(Math.random() * (max - min + 1)) + min;
  sliderarray.push(
    <div className="">


       <div className="col-xs-6 col-sm-3   mobile-collpase">
           <div className="banner-text style2">
               <div className="image">
                   <a className="banner-opacity" href="#"><img src={dress[rand_nu].img} alt="" /></a>
               </div>
               <div className="content-text">
                   <h3 className="title">{dress[rand_nu].price}</h3>
                   <h4 className="title hidden">{dress[rand_nu].description}</h4>
                      <h5 className="title hidden">{dress[rand_nu].type}</h5>

               </div>
           </div>

       </div>
       <div className="col-xs-6 col-sm-3  mobile-collpase">
           <div className="banner-text style2">
               <div className="image">

                   <a className="banner-opacity" href="#"><img src={earings[rand_nu].img} alt="" /></a>
               </div>
               <div className="content-text">
                   <h3 className="title">{earings[rand_nu].price}</h3>
                   <h4 className="title hidden">{earings[rand_nu].description}</h4>
                        <h5 className="title hidden">{earings[rand_nu].type}</h5>

               </div>
           </div>
       </div>
      <div className="col-xs-6 col-sm-3   mobile-collpase">
       <div className="banner-text style2">
           <div className="image ">
               <a className="banner-opacity" href="#"><img src={handbags[rand_nu].img} alt="" /></a>
           </div>
           <div className="content-text">
               <h3 className="title">{handbags[rand_nu].price}</h3>
               <h4 className="title hidden">{handbags[rand_nu].description}</h4>
               <h5 className="title hidden">{handbags[rand_nu].type}</h5>

           </div>
       </div>
       </div>
       <div className=" col-xs-6 col-sm-3 mobile-collpase">
           <div className="banner-text style2">
               <div className="image">
                   <a className="banner-opacity" href="#"><img src={shoes[rand_nu].img} alt="" /></a>
               </div>
               <div className="content-text">
                   <h3 className="title">{shoes[rand_nu].price}</h3>
                   <h4 className="title hidden">{shoes[rand_nu].description}</h4>
                   <h5 className="title hidden">{shoes[rand_nu].type}</h5>

               </div>
           </div>
       </div>

       </div>
  )

  var rand_nu = Math.floor(Math.random() * (max - min + 1)) + min;
  sliderarray.push(
    <div className="">

       <div className="col-xs-6 col-sm-3  mobile-collpase">
           <div className="banner-text style2">
               <div className="image">

                   <a className="banner-opacity" href="#"><img src={tops[rand_nu].img} alt="" /></a>
               </div>
               <div className="content-text">
                   <h3 className="title">{tops[rand_nu].price}</h3>
                   <h4 className="title hidden">{tops[rand_nu].description}</h4>
                              <h5 className="title hidden">{tops[rand_nu].type}</h5>

               </div>
           </div>
       </div>
       <div className="col-xs-6 col-sm-3   mobile-collpase">
           <div className="banner-text style2">
               <div className="image">
                   <a className="banner-opacity" href="#"><img src={necklace[rand_nu].img} alt="" /></a>
               </div>
               <div className="content-text">
                   <h3 className="title">{necklace[rand_nu].price}</h3>
                   <h4 className="title hidden">{necklace[rand_nu].description}</h4>
                          <h5 className="title hidden">{necklace[rand_nu].type}</h5>

               </div>
           </div>

       </div>
       <div className=" col-xs-6 col-sm-3 mobile-collpase">
           <div className="banner-text style2">
               <div className="image">
                   <a className="banner-opacity" href="#"><img src={pants[rand_nu].img} alt="" /></a>
               </div>
               <div className="content-text">
                   <h3 className="title">{pants[rand_nu].price}</h3>
                   <h4 className="title hidden">{pants[rand_nu].description}</h4>
                        <h5 className="title hidden">{pants[rand_nu].type}</h5>

               </div>
           </div>
       </div>
      <div className="col-xs-6 col-sm-3   mobile-collpase">
       <div className="banner-text style2">
           <div className="image ">
               <a className="banner-opacity" href="#"><img src={bags[rand_nu].img} alt="" /></a>
           </div>
           <div className="content-text">
               <h3 className="title">{bags[rand_nu].price}</h3>
               <h4 className="title hidden">{bags[rand_nu].description}</h4>
                <h5 className="title hidden">{bags[rand_nu].type}</h5>

           </div>
       </div>
       </div>


       </div>
  )

  var rand_nu = Math.floor(Math.random() * (max - min + 1)) + min;
  sliderarray.push(
     <div className="">

        <div className="col-xs-6 col-sm-3  mobile-collpase">
            <div className="banner-text style2">
                <div className="image">

                    <a className="banner-opacity" href="#"><img src={tops[rand_nu].img} alt="" /></a>
                </div>
                <div className="content-text">
                    <h3 className="title">{tops[rand_nu].price}</h3>
                    <h4 className="title hidden">{tops[rand_nu].description}</h4>
                                  <h5 className="title hidden">{tops[rand_nu].type}</h5>

                </div>
            </div>
        </div>
        <div className="col-xs-6 col-sm-3   mobile-collpase">
            <div className="banner-text style2">
                <div className="image">
                    <a className="banner-opacity" href="#"><img src={shoes[rand_nu].img} alt="" /></a>
                </div>
                <div className="content-text">
                    <h3 className="title">{shoes[rand_nu].price}</h3>
                    <h4 className="title hidden">{shoes[rand_nu].description}</h4>
                      <h5 className="title hidden">{shoes[rand_nu].type}</h5>

                </div>
            </div>

        </div>
       <div className="col-xs-6 col-sm-3   mobile-collpase">
        <div className="banner-text style2">
            <div className="image ">
                <a className="banner-opacity" href="#"><img src={bags[rand_nu].img} alt="" /></a>
            </div>
            <div className="content-text">
                <h3 className="title">{bags[rand_nu].price}</h3>
                <h4 className="title hidden">{bags[rand_nu].description}</h4>
                  <h5 className="title hidden">{bags[rand_nu].type}</h5>

            </div>
        </div>
        </div>
        <div className=" col-xs-6 col-sm-3 mobile-collpase">
            <div className="banner-text style2">
                <div className="image">
                    <a className="banner-opacity" href="#"><img src={jeans[rand_nu].img} alt="" /></a>
                </div>
                <div className="content-text">
                    <h3 className="title">{jeans[rand_nu].price}</h3>
                    <h4 className="title hidden">{jeans[rand_nu].description}</h4>
                                  <h5 className="title hidden">{jeans[rand_nu].type}</h5>

                </div>
            </div>
        </div>
      

        </div>
  )




  }

  this.setState({

      sli:sliderarray

  }
  )
  //console.log(sliderarray)
  $('.your-class').slick({ dots: false, infinite: true, speed: 500, fade: true, autoplay:false, arrows: true,draggable:false

        });
        var elastic_cat
        var elastic_cat_sum=""
        var elastic_prod_four =[]
 /*  setcurrent = ()=>{

      
  var  dm
   elastic_cat
   elastic_cat_sum=""
   elastic_prod_four =[]

  var all_slider_images = document.getElementsByClassName('slick-active')[0].getElementsByTagName('img')
  var all_slider_text = document.getElementsByClassName('slick-active')[0].getElementsByTagName('h3')
  var all_slider_des = document.getElementsByClassName('slick-active')[0].getElementsByTagName('h4')
  var all_slider_type = document.getElementsByClassName('slick-active')[0].getElementsByTagName('h5')

  for (var x=0;x<all_slider_images.length;x++)
  {
      var check_one = true
     dm ={
        img_s:all_slider_images[x].src,
        text_s :all_slider_text[x].innerText,
        text_des :all_slider_des[x].innerText
      }
      dummyjson.push(dm)
      try{
       elastic_cat = all_slider_des[x].innerText.split("Name:")[1].split(", Category")[0]
       //alert(elastic_cat)
      }catch(e){
      elastic_cat=all_slider_des[x]

      }
    elastic_cat_sum = all_slider_type[x].innerText +"|"+elastic_cat_sum

    var _idd = all_search_result_api.map(c=>{

      if(c._source.img ==all_slider_images[x].src){

         if(check_one){
           check_one=false
        elastic_prod_four.push({
          'productID':c._id,
          'text':elastic_cat,

        })
      }


      }

    })

  }
} */

     /*   document.getElementsByClassName('slick-prev')[0].addEventListener('click',()=>{
          var selectrandom_user  = Math.floor(Math.random() * allregistereduser.length);
          var promiseview  = new Promise((res,rej)=>{

            client.search({
              index: 'viewoutfits',
          
              
            },function (error, response,status) {
              try{
                    response.hits.hits.forEach(function(hit){
                   
                      all_view.push(hit._source["uu-id"])
                      
          
                    })
                  }catch(e){}
                    res()
                        
                })
    
          }).then(x=>{
    
    
        
    
    
              if(!all_view.includes(elastic_prod_four[0].productID+"_"+elastic_prod_four[1].productID+"_"+elastic_prod_four[2].productID+"_"+elastic_prod_four[3].productID)){
                client.index({
                  index: 'viewoutfits',
                  type: 'posts',
                  body: {
                      "outfit-type":elastic_cat_sum,
                      "outfit": elastic_prod_four,
                      "ip":resutl_api.ip,
                      "user_Agent":user_deatls.Platform,
                      "age":input_age,
                      "profession":input_profession,
                       "sessionID":resutl_api.ip + " " + user_deatls.Browser_Name,
                       "uu-id":elastic_prod_four[0].productID+"_"+elastic_prod_four[1].productID+"_"+elastic_prod_four[2].productID+"_"+elastic_prod_four[3].productID,
                       "user_emial":this.state.name
                      }
              }, function(err, resp, status) {
          
              });
            }
          })
          setcurrent()
        //alert('added to view only left')
    
     
         }) */ 
     
       /*  document.getElementsByClassName('slick-next')[0].addEventListener('click',()=>{
       
    
      var promiseview  = new Promise((res,rej)=>{

        client.search({
          index: 'viewoutfits',
      
          
        },function (error, response,status) {
          try{
                response.hits.hits.forEach(function(hit){
               
                  all_view.push(hit._source["uu-id"])
                  
            
                })
              }catch(e){}
              res()
                    
            })

      }).then(x=>{


    


          if(!all_view.includes(elastic_prod_four[0].productID+"_"+elastic_prod_four[1].productID+"_"+elastic_prod_four[2].productID+"_"+elastic_prod_four[3].productID)){
            client.index({
              index: 'viewoutfits',
              type: 'posts',
              body: {
                  "outfit-type":elastic_cat_sum,
                  "outfit": elastic_prod_four,
                  "ip":resutl_api.ip,
                  "user_Agent":user_deatls.Platform,
                  "age":input_age,
                  "profession":input_profession,
                   "sessionID":resutl_api.ip + " " + user_deatls.Browser_Name,
                   "uu-id":elastic_prod_four[0].productID+"_"+elastic_prod_four[1].productID+"_"+elastic_prod_four[2].productID+"_"+elastic_prod_four[3].productID,
                   "user_emial":this.state.name
                  }
          }, function(err, resp, status) {
      
          });
        }
      })
        setcurrent()
        //alert('added to view only right')
     
          })  */


   // liked button logic
   var counterloginloop = 0
   document.getElementsByClassName('btn-prev')[0].addEventListener('click',()=>{
    $('.your-class').slick('slickPrev');
  

    if(window.localStorage.token == undefined){

      counterloginloop =     counterloginloop + 1
      if(counterloginloop == 3){

        this.modelbox.click()
      }

    }
    var user_deatls_all =
    {
  
  
  "system_options": user_deatls,
  "basic_option":resutl_api
  
  
  }
  

    var dm
    var elastic_cat
    var elastic_cat_sum=""
    var elastic_prod_four =[]
    var all_slider_images = document.getElementsByClassName('slick-active')[0].getElementsByTagName('img')
    var all_slider_text = document.getElementsByClassName('slick-active')[0].getElementsByTagName('h3')
    var all_slider_des = document.getElementsByClassName('slick-active')[0].getElementsByTagName('h4')
    var all_slider_type = document.getElementsByClassName('slick-active')[0].getElementsByTagName('h5')
  
    for (var x=0;x<all_slider_images.length;x++)
    {
        var check_one = true
       dm ={
          img_s:all_slider_images[x].src,
          text_s :all_slider_text[x].innerText,
          text_des :all_slider_des[x].innerText
        }
        dummyjson.push(dm)
        try{
         elastic_cat = all_slider_des[x].innerText.split("Name:")[1].split(", Category")[0]
         //alert(elastic_cat)
        }catch(e){
        elastic_cat=all_slider_des[x]
  
        }
      elastic_cat_sum = all_slider_type[x].innerText +"|"+elastic_cat_sum
  
      var _idd = all_search_result_api.map(c=>{
  
        if(c._source.img ==all_slider_images[x].src){
  
           if(check_one){
             check_one=false
          elastic_prod_four.push({
            'productID':c._id,
            'text':elastic_cat,
  
          })
        }
  
  
        }
  
      })
  
    }
    var dummyuuid = "NA"
    try{
      dummyuuid = elastic_prod_four[0].productID+"_"+elastic_prod_four[1].productID+"_"+elastic_prod_four[2].productID+"_"+elastic_prod_four[3].productID
    }
    catch(e){

      dummyuuid = "NA"
    }
    var selectrandom_user  = Math.floor(Math.random() * allregistereduser.length);
    client.index({
         index: 'likedoutfits',
         type: 'posts',
         body: {
             "outfit-type":elastic_cat_sum,
             "outfit": elastic_prod_four,
             "ip":resutl_api.ip,
             "user_Agent":user_deatls.Platform,
             "age":input_age,
             "profession":input_profession,
             "sessionID":resutl_api.ip + " " + user_deatls.Browser_Name,
             "uu-id": dummyuuid,
             "user_emial":this.state.name
  
         }
     }, function(err, resp, status) {
  
     });
  
  
  
  
      this.props.onadditem()
    
        $('.your-class').slick('slickPrev');
       // alert('added to like')
       this.popw.classList.remove('hidden')
       var popsup = this.popw
       setTimeout(function(){   popsup.classList.add('hidden') }, 2000);

   })
  
  
   ///////////////////////////////end/////////////////////////////////////


   //dislike button logic

   document.getElementsByClassName('btn-next')[0].addEventListener('click',()=>{
  

    $('.your-class').slick('slickPrev');
    var user_deatls_all =
    {
 
 
  "system_options": user_deatls,
  "basic_option":resutl_api
 
 
  }
 
 
    var  dm
 
    var elastic_cat = ""
    var elastic_cat_sum=""
    var elastic_prod_four =[]
    var all_slider_images = document.getElementsByClassName('slick-active')[0].getElementsByTagName('img')
    var all_slider_text = document.getElementsByClassName('slick-active')[0].getElementsByTagName('h3')
    var all_slider_des = document.getElementsByClassName('slick-active')[0].getElementsByTagName('h4')
       var all_slider_type = document.getElementsByClassName('slick-active')[0].getElementsByTagName('h5')
    for (var x=0;x<all_slider_images.length;x++)
    {
      var check_one = true
 
 
      elastic_cat_sum = all_slider_type[x].innerText +"|"+elastic_cat_sum
      try{
       elastic_cat = all_slider_des[x].innerText.split("Name:")[1].split(", Category")[0]
       //alert(elastic_cat)
      }catch(e){
      elastic_cat=all_slider_des[x]
 
      }
      var _idd = all_search_result_api.map(c=>{
 
        if(c._source.img ==all_slider_images[x].src){
 
           if(check_one){
             check_one=false
          elastic_prod_four.push({
            'productID':c._id,
            'text':elastic_cat,
 
 
          })
        }
 
 
        }
 
      })
 
    }
    var selectrandom_user  = Math.floor(Math.random() * allregistereduser.length);

    var dummyuuid = "NA"
    try{
      dummyuuid = elastic_prod_four[0].productID+"_"+elastic_prod_four[1].productID+"_"+elastic_prod_four[2].productID+"_"+elastic_prod_four[3].productID
    }
    catch(e){

      dummyuuid = "NA"
    }
    client.index({
         index: 'dislikedoutfits',
         type: 'posts',
         body: {
             "outfit-type":elastic_cat_sum,
             "outfit": elastic_prod_four,
             "ip":resutl_api.ip,
             "user_Agent":user_deatls.Platform,
             "age":input_age,
             "profession":input_profession,
              "sessionID":resutl_api.ip + " " + user_deatls.Browser_Name,
 "uu-id":dummyuuid,
 "user_emial":this.state.name
         }
     }, function(err, resp, status) {
 
     });
 
 
 
 
 
 
      this.props.onadditem()
 
 
  
   $('.your-class').slick('slickPrev');
   //alert('added to dislike')
   this.pop_dis.classList.remove('hidden')
   var popsup = this.pop_dis
   setTimeout(function(){   popsup.classList.add('hidden') }, 2000);
 
 

   })

   /////////////////////end ///////////////////////////


  var all_data_array = shoes.concat(shoes).concat(jeans).concat(bags).concat(shirts).concat(pants).concat(skirts).concat(handbags).concat(earings).concat(dress).concat(necklace).concat(tops)
  var add_promise =  new Promise((res,rej)=>{
  var counterloop= 1
  //console.log(all_search_stored_imgs)
    all_data_array.map(x=>{

  if(!all_search_stored_imgs.includes(x.img)){
      client.index({
          index: 'allproducts',
          type: 'posts',
          body: x
      }, function(err, resp, status) {
       console.log('adding');
      });
    }
  counterloop++
  //console.log(counterloop)
  //console.log(all_data_array.length)
    })
    if (all_data_array.length < counterloop){

      try{
            document.getElementsByClassName('loader')[0].style.display="none"
          
          
           
          }catch(e){}
          setTimeout(function(){  res()
           }, 4000);

    }


  })
  add_promise.then(xj=>{

    client.search({
       index: 'allproducts',
       type: 'posts',
       body: {
         from : 0, "size" : 10000,
         query: {
           match_all: {}
         },
       }

     },function (error, response,status)
      {
         if (error){
      //     console.log("search error: "+error)
         }
         else {
        //   console.log("--- Response ---");
        //   console.log(response);
        //   console.log("--- Hits ---");
           response.hits.hits.forEach(function(hit){
           all_search_result_api.push(hit)

           })
         }
     });

  })



  })


})


}

render() {

   return (
<div>
<div className="loader">MATCHING..</div>
<div className="your-class1">
  <div className="your-class">
    {this.state.sli}

  </div>
  <div className="btn btn-prev"><i className="fa fa-heart"></i></div>
  <div className="btn btn-next"><i className="fa fa-retweet"></i></div>

</div>

<div className="popupwindows hidden" ref={(f)=>{this.popw = f}} >
        <i className="fa fa-heart" aria-hidden="true"></i> &nbsp;Added to Choice !
          </div>

          <div className="popupwindows dislike hidden" ref={(f)=>{this.pop_dis = f}} >
        <i className="fa fa-refresh" aria-hidden="true"></i> &nbsp;We have other options as well !
          </div>

          <button type="button" className="btn btn-info btn-lg hidden" ref={(g)=>this.modelbox = g } data-toggle="modal" data-target="#myModal">Open Modal</button>
          <div className="modal fade inputmodel" id="myModal" role="dialog">
          <div className="modal-dialog">


            <div className="modal-content registermodelwork">
              <div className="modal-header">

                <h4 className="modal-title">Create Your Account Now</h4>
              </div>
              <div className="modal-body">
              <div className="kt-popup-newsletter">
                 <div className="popup-title">

              <div  className="logo-sider-black1 ">JENNY FASHION</div>
                 </div>
                 <form className="form-subscribe">
                 
                 <input className="input" value={this.state.register.email} onChange={this.email_assign.bind(this)}  placeholder="Email"  type="email" />
              
             <input className="input" value={this.state.register.password} onChange={this.password_assign.bind(this)}  placeholder="password"  type="password" />
           


     
    
     <div className="element-icon style2" onClick={this.loginenter}><div className="icon"><i className="flaticon flaticon-origami28"></i></div><div className="content"><h4 className="title">Register</h4></div></div>



                </form>

              </div>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>

          </div>
        </div>
  



</div>

);

} }

const mapStateToProps = state => {
  console.log(state)
  return {
    all_t: state.form_input_data,
    user_details : state.user

  };
};
const mapDispachToProps = (dispatch) => {
  dispatch({ type: "update_logo",value:'color_logo_class_black'})

return {
    onadditem: () => dispatch({ type: "add_item",value:dummyjson}),
    onadditemrecom: () => dispatch({ type: "add_item_recom",value:final_recom}),



  };
};
export default connect(mapStateToProps,

  mapDispachToProps

)(work);
