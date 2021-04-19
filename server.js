const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');
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

// listen to the server
// app.listen(5000);
const port = process.env.PORT || 5000;

// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
app.use((req, res, next) => {
  console.log(`Request_Endpoint: ${req.method} ${req.url}`);
  next();
});

// Configure the bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Configure the CORs middleware
app.use(cors());

// This middleware informs the express application to serve our compiled React files
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function (req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
};

// Catch any bad requests
app.get('*', (req, res) => {
  res.status(200).json({
      msg: 'Catch All'
  });
});


// Import Routes
const newsRoute = require("./routes/news");
app.use("/news", newsRoute);

// connection with Mongo DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("conected to DB!");
  }
);


// Configure our server to listen on the port defiend by our port variable
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));