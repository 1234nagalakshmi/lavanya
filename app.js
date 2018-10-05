"use strict";
var fb = require('./fbs');
const request = require("request");
const express = require("express");
const bodyParser = require("body-parser");
var unirest = require("unirest");
var OAuth2 = require('oauth2').OAuth2;
var oauth2 = new OAuth2("757203371154308",
  "0ff3adb79309e0c85a16b1da32a8971c",
  "", "https://www.facebook.com/dialog/oauth",
  "https://graph.facebook.com/oauth/access_token",
  null);
/* This is the code for IBM Cloudant Database
var Cloudant = require('cloudant');
var me = "cloudant username"; // Set this to your own account
var password = "cloudant password";

// Initialize the library with my account.
var cloudant = Cloudant({account:me, password:password});
  var db = cloudant.db.use('your database name')

cloudant.db.list(function(err, allDbs) {
  console.log('Available Databases: %s', allDbs.join(', '))
});
*/
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.post("/webhookcall", function (req, res) {
  console.log("webhook is Hit");
  console.log("JSON data from API.AI" + req.body);
  const action = req.body.result.action; // storing the actions
  const parameters = req.body.result.parameters; //storing the parameters

  console.log('Server webhook data');


  if (action == 'input.savedonordata') {
    console.log(req.body.originalRequest.data.sender);

    return res.json({
      speech: 'your response',
      displayText: 'youresponse',
      source: "giveanyname_projectname"
    });
  }
  
});


app.listen(process.env.PORT || 8080, function () {
  console.log("Server up and listening");
});




function insert(dataobject) {
  db.insert(dataobject, function (err, body, header) {
    if (err) {
      return console.log('[db.insert] ', err.message);
    }

    console.log('You have inserted the Data.');
    console.log(body);
  });
}