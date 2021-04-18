const fetch = require("node-fetch");
const mongoose = require("mongoose");
require("dotenv/config");

// pide data una sola vez
const url = "http://hn.algolia.com/api/v1/search_by_date?query=nodejs";

async function getData(url) {
  try {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json.hits.length);
    // tendria que hacerse el llenado de datos


  } catch (err) {
    console.log(error);
  }
}

getData(url);


// Pide la data cada X tiempo 
// function myFunc(url) {

//   async function getData(url) {
//     try {
//       const response = await fetch(url);
//       const json = await response.json();
//       console.log(json);
//     } catch (err) {
//       console.log(error);
//     }
//   }

//   getData(url)
// }

//setInterval(myFunc, 5000, "http://hn.algolia.com/api/v1/search_by_date?query=nodejs");


//conectarse con Mongo DB
// mongoose.connect(
//   process.env.DB_CONNECTION,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   () => {
//     console.log("conected to DB!");
//   }
// )

// conection with mongo database
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://testguy:Google2349@cluster0.vk6rw.mongodb.net/ReignProyect?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });