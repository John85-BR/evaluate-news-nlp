const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const url = "https://api.meaningcloud.com/sentiment-2.1?key=";
const fetch = require("node-fetch");
dotenv.config();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));
console.log(__dirname);

app.get('/', (req, res)=> {
   //res.sendFile('dist/index.html')
   res.sendFile(path.resolve('src/client/views/index.html'));
});
const port = 8081;
// designates what port the app will listen to for incoming requests
app.listen(port, () =>{
    console.log(`Example app listening on port ${port}!`);
});

app.post('/searchText', async (req, res) =>{ 
  const norm = req.body.text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[’#!'$%\^&\*;:{}=\-–_`´~()]/g,"");
  const name = `&of=json&txt=${norm}&model=general&lang=auto`;
  const response = await fetch(url+process.env.API_KEY+name);
  try {       
    const data = await response.json();  
    res.send(data);
  }catch(error){
  // appropriately handle the error
  //alert the user
    alert('Error while sending data by the server');
  }
});

app.post('/searchUrl', async (req, res) =>{
  const name = `&of=json&url=${req.body.url}&model=general&lang=auto`; 
  const response = await fetch(url+process.env.API_KEY+name);
  try{       
    const data = await response.json();   
    res.send(data);
  }catch(error){
      // appropriately handle the error
      //alert the user
    alert('Error while sending data by the server');
  }       
});

