const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');

const apiRoute = require("./app/routes/api");

// mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/mean-app", (err) => {
    if(err){
        console.log("Error: "+ err);
    } else {
        console.log("Connected to the MongoDB");
    }
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.static(__dirname + '/public'));

app.use('/api', apiRoute);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + "/public/app/views/index.html"));
});

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      msg: error.message
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Running on port "+ port);
})
