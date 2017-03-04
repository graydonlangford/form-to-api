// require external libraries
var express = require('express')
var bodyParser = require('body-parser')

// require custom external files
// var FormSubmission = require('FormSubmissionClass.js') // class for the form submission and it's tools
// var maropost = require('maropost.js') // object for using the maropost API

// set up express server
var app = express()
var PORT = process.env.PORT || 3000

// apply bodyParser middleware for all requests: de-stringifies requests.
app.use(bodyParser.json())

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
// ====================================================== //


// ================= Form post listener ================= //
app.post('/form', (req, res)=>{
  console.log(req.body)
/*
  var formData = new FormSubmission(req.body)

  formData.trimInvalidFields()

  if (formData.isValid()) {
    //redirect to home?
  } else {
    //redirect with error?
  }
*/
})
// ====================================================== //

// Start the server
app.listen(PORT, function () {
  console.log('Express listening on port ' + PORT + '!')
})
