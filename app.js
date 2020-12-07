//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
// const request = require("request");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



// let url = "http://coronavirus-19-api.herokuapp.com/countries/" + country;

var total = 0;
var recovered = 0;
var deaths = 0;
var gbody = "sf";
const request = require('request');
const { count } = require("console");

var country = "";

url = "http://coronavirus-19-api.herokuapp.com/countries/" + country;

let options = {json: true};
var EventEmitter = require("events").EventEmitter;
var body = new EventEmitter();
 

  app.get("/home",function(req,res){
    url = "http://coronavirus-19-api.herokuapp.com/countries/" + country;
    request(url, options, (error, res, data) => {

      if (error) {
          return  console.log(error)
      };
  
      if (!error && res.statusCode == 200) {

        body.data = data;
        body.emit('update');

      };
    });
    body.on('update', function () {
      // console.log(body.data); // HOORAY! THIS WORKS!
      total = body.data.cases;
      recovered = body.data.recovered;
      deaths = body.data.deaths;
      res.render("home",{
        total_cases : total,
        total_deaths: deaths,
        total_recovered: recovered
      })
  });
  });


app.get("/",function(req,res){
  res.render("index");
});


app.post("/",function(req,res){
  console.log(req.body.search_country);
  country = req.body.search_country
  res.redirect("/home");
});






app.listen(3000, function() {
  console.log("Server started on port 3000");
});
