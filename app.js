const fetch = require("node-fetch");
const mongoose = require("mongoose");
require("dotenv/config");
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.DB_CONNECTION, {
  useUnifiedTopology: true,
});

// pide data una sola vez
const url = "http://hn.algolia.com/api/v1/search_by_date?query=nodejs";
const dbName = "ReignProyect";

async function getData(url) {
  try {
    const response = await fetch(url);
    const json = await response.json();
    const news = json.hits;
    const arrayUnqNews = [
      ...new Map(
        news.map((item) => [
          item["story_id"],
          {
            story_id: item.story_id,
            story_title: item.story_title,
            story_url: item.story_url,
            author: item.author,
            created_at: item.created_at,
          },
        ])
      ).values(),
    ];
    // tendria que hacerse el llenado de datos
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    const col = db.collection("news");
    const p = await col.insertMany(arrayUnqNews);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
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
