// pull in dependancies
var request = require('request') // makes requests for us
var dotenv = require('dotenv') // allows us to store senstive information in .env files

dotenv.load() // load the file in the root directory called ".env".

// define an object to be exported
maropostApi = {
  // this function returns some default options for making requests to maropost
  options: function (replacementOptions) {
    var optionObject = {
      json: true,
      url: 'https://api.maropost.com/accounts/423/',
      method: 'POST',
      qs: {
        auth_token: process.env.MAROPOST_API_KEY // pulls in using dotenv
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }

    // if an object is provided as an argument to this function, merge the the options above
    // with that argument.
    Object.assign(optionObject, replacementOptions)

    return optionObject
  },

  // makes a request to maropost to create a contact
  createContact: function (reqBody) {
    console.log('creating contact');

    // callt he options method to get an isntance of the options we need to make the request
    var options = maropostApi.options({
      body: {
        first_name: reqBody.fname,
        last_name: reqBody.lname,
        email: reqBody.email
      }
    })
    options.url += 'contacts.json'

    // return a promise, which allows us to take additional actions after this is done
    return new Promise(function(resolve, reject) {
      // make the post request to maropost
      request(options, function (err, res, body) {
        // if the request was successful, resolve the promise
        if(!err && res.statusCode >= 200 && res.statusCode < 300) {
          console.log("successfully created contact");
          resolve(reqBody)
        } else {
          console.log("there was an error creating the contact");
          reject(err)
        }
      })
    })
  },

  // makes a request to maropost adding an email to the journey
  startJourney: function (reqBody) {
    console.log('starting journey');

    // set the options
    var options = maropostApi.options()
    options.url += 'journeys/15394/trigger/40774607451808.json'
    options.qs.email = reqBody.email

    // return a promise in case further actions need to happen after this
    return new Promise(function(resolve, reject) {
      //. make the request
      request(options, function (err, res, body) {

        // if we get a 200 status,then we're good; resolve the promise
        if (!err && res.statusCode >= 200 && res.statusCode < 300) {
          console.log('successfully added to journey')
          resolve()
        } else {
          console.log("there was an error adding contact to journey");
          reject(err)
        }
      })
    })
  }
}

// exports the object so other files can use it
module.exports = maropostApi
