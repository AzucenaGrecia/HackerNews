const express = require("express");
const router = express.Router();
const New = require("../models/New");

router.get("/", async (req, res) => {
  try {
    const news = await New.find();
    res.json(news);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
