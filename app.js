// app.js

const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const {spawn} = require('child_process');




var cors = require('cors');

// routes
const autoSuggest = require('./routes/api/autoSuggest');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors());


// Init Middleware
app.use(express.json({ extended: false }));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
//   });


app.get('/', (req, res) => res.send('Hello world!'));

const data = require('./SuggestionResults.json');

app.get('/getSuggestions', (req, res) => {
    var dataToSend;
    const python = spawn('python', ['writeResults.py','I am really sad right now :(']);

    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
        console.log(dataToSend);
  });
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // console.log(dataToSend);
        // res.send(dataToSend);
  });
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(data));
});




app.get('/api/autosuggest', (req, res) => res.send('Hello!'));


// use Routes
app.use('/api/autoSuggest', autoSuggest);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));