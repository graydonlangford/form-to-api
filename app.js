// require external libraries
var express = require('express')
var bodyParser = require('body-parser')
var expressValidator = require('express-validator')
var _ = require('underscore')

var maropost = require('./maropostApi.js') // object for using the maropost API

// set up express server
var app = express()
var PORT = process.env.PORT || 3000

// apply bodyParser middleware for all requests: de-stringifies requests.
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator())

// ================= Serve Page Routes ================== //
// serve all files in public
app.use(express.static('public'))

// allow the user to access '/' instead of only 'index.html':
app.get('/', (req,res)=>{
  res.sendFile(__dirname + '/public/index.html')
})

// allow the user to access '/index' instead of only 'index.html':
app.get('/index', (req,res)=>{
  res.sendFile(__dirname + '/public/index.html')
})

app.get('/error', (req,res)=>{
  res.sendFile(__dirname + '/public/error.html')
})
// ====================================================== //


// ================= Form post listener ================= //
app.post('/form', (req, res)=>{
  // console.log(req.body)

  var allowedFields = [
    'fname',
    'lname',
    'email'
  ]

  req.body = _.pick(req.body, allowedFields)

  req.sanitizeBody('fname').escape()
  req.sanitizeBody('lname').escape()
  req.sanitizeBody('email').escape()

  req.checkBody('fname', 'Invalid fname').isAlpha().notEmpty()
  req.checkBody('lname', 'Invalid lname').isAlpha().notEmpty()
  req.checkBody('email', 'Invalid email').isEmail().notEmpty()

  var errors = req.validationErrors()

  if (errors) {
    console.log(errors)
    res.redirect('/error')
  } else {
    res.redirect('/')
    maropost.createContact(req.body)
    .then(maropost.startJourney)
    .catch(function (error) {
      console.log(error)
    })
  }

})
// ====================================================== //

// Start the server
app.listen(PORT, function () {
  console.log('Express listening on port ' + PORT + '!')
})
