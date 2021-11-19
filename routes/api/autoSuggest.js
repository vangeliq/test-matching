// routes/api/books.js

const express = require('express');
const {spawn} = require('child_process');
const router = express.Router();


const data = require('./results.json')

router.get("/entered", (req, res) => {
  console.log(req.body)
  console.log('Hit')
  console.log("OIANSFjhgckjh j hjONSOFI")

  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(data));
});

// router.get("/entered", (req, res) => {
//   var dataToSend;
//   // console.log(req.body)
//   // const python = spawn('python', [script,'I am really sad right now :(']);
//   const python = spawn('python', [script,'I am really sad right now :(']);
//   python.stdout.on('data', function (data) {
//     console.log('Pipe data from python script ...');
//     dataToSend = data.toString();
//     console.log(dataToSend);
//   });

//   python.on('close', (code) => {
//     console.log(`child process close all stdio with code ${code}`);
//     // console.log(dataToSend);
//     res.send(dataToSend);
//   });



//   // res.header("Content-Type",'application/json');
//   // res.send(JSON.stringify(data));
// });


// router.get('/entered', (req, res) => {
//   // var dataToSend;
//   var largeDataSet = [];

//   // // spawn new child process to call the python script
//   // // //how to write with params:
//   // const python = spawn('python', ['script2.py','node.js','python']);
//   const python = spawn('python', ['writeResults.py','I am really sad right now :(']);


//   // // collect data from script
//   python.stdout.on('data', function (data) {
//    console.log('Pipe data from python script ...');

//   //  dataToSend = data.toString();
//   largeDataSet.push(data);

//   });
//   // // in close event we are sure that stream from child process is closed
//   python.on('close', (code) => {
//   console.log(`child process close all stdio with code ${code}`);
//   // // // send data to browser
//   // res.send(dataToSend);
//   // res.send(largeDataSet.join(""))
//   });
//   const data = require('results.json');
//   res.header("Content-Type",'application/json');
//   res.send(JSON.stringify(data));
//   // res.send("we made it to the end");
//  });

module.exports = router;