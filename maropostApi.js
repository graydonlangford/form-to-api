var request = require('request')
var dotenv = require('dotenv')

dotenv.load() // load the file in the root directory called ".env".

maropostApi = {
  options: function (replacementOptions) {
    var optionObject = {
      json: true,
      url: 'https://api.maropost.com/accounts/423/',
      method: 'POST',
      qs: {
        auth_token: process.env.MAROPOST_API_KEY
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }

    Object.assign(optionObject, replacementOptions)

    return optionObject
  },

  createContact: function (reqBody) {
    console.log('creating contact');

    var options = maropostApi.options({
      body: {
        first_name: reqBody.fname,
        last_name: reqBody.lname,
        email: reqBody.email
      }
    })
    options.url += 'contacts.json'

    return new Promise(function(resolve, reject) {
      request(options, function (err, res, body) {
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

  startJourney: function (reqBody) {
    var options = maropostApi.options()
    options.url += 'journeys/15394/trigger/40774607451808.json'
    options.qs.email = reqBody.email

    console.log(maropostApi.options());
    console.log(options);

    return new Promise(function(resolve, reject) {
      request(options, function (err, res, body) {
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

module.exports = maropostApi
