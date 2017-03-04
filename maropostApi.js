var request = require('request')
var dotenv = require('dotenv')

dotenv.load() // load the file in the root directory called ".env".

maropostApi = {
  options: {
    json: true,
    url: 'https://api.maropost.com/accounts/423/',
    method: 'POST',
    qs: {
      auth_token: process.env.MAROPOST_API_KEY
    },
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: {}
  },

  createContact: function (contact, callback) {
    console.log('creating contact');
    this.options.url += 'contacts.json'
    this.options.body.first_name = contact.fname
    this.options.body.last_name = contact.lname
    this.options.body.email = contact.email

    var callback = function (err, res, body) {
      if (!err && res.statusCode >= 200 && res.statusCode < 300) {
        console.log('successfully created contact')
        // startJourney(contact, startJourneyCallback)
      } else {
        console.log('there was an error creating contact')
        console.log(res.statusCode);
        console.log(body);
        console.log(err)
      }
    }

    var result = request(this.options, callback)

  },

  startJourney: function (email, callback) {
    this.options.url += 'journeys/15394/trigger/40774607451808.json'
    this.options.url += '?email=' + email

    var startJourneyCallback = function (err, res, body) {
      if (!err && res.statusCode == 200) {
        console.log('successfully added to journey')
      } else {
        console.log('there was an error adding contact to journey')
        console.log(err)
      }
    }

    request(this.options, callback)
  }
}

module.exports = maropostApi
