const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const mongoose = require("mongoose");
require("dotenv/config");
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.DB_CONNECTION, {
  useUnifiedTopology: true,
});

// request to HACKER NEWS API each hour
function myFunc(url) {
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
      await client.connect();
      const db = client.db("ReignProyect");
      const col = db.collection("news");
      const p = await col.insertMany(arrayUnqNews);
      console.log("Data was stored into Mongo DB");
    } catch (err) {
      console.log(err.stack);
    }
  }

  getData(url);
}

setInterval(
  myFunc,
  1000 * 60 * 60 * 1,
  "http://hn.algolia.com/api/v1/search_by_date?query=nodejs"
);
// Midlewares
app.use(cors());
app.use(bodyParser.json());

// Import Routes
const newsRoute = require("./routes/posts");
app.use('/news', newsRoute);

// connection with Mongo DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("conected to DB!");
  }
);
// listen to the server
app.listen(3000);
