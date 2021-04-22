const mongoose = require("mongoose");

const newSchema = mongoose.Schema({
  story_id: {
    type: Number,
    required: true,
  },
  story_title: {
    type: String,
    required: true,
  },
  story_url: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  created_at: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("News", newSchema);
// {
//   created_at: '2021-04-18T04:33:16.000Z',
//   title: null,
//   url: null,
//   author: 'rantwasp',
//   points: null,
//   story_text: null,
//   comment_text: 'that’s not how 51% attacks work. you have the miners but you also have the actual bitcoin nodes that are witnessing the blockchain growth.',
//   num_comments: null,
//   story_id: 26849652,
//   story_title: 'Bitcoin Mining Hash Rate Drops as Blackouts Instituted in China',
//   story_url: 'https://www.nasdaq.com/articles/bitcoin-mining-hash-rate-drops-as-blackouts-instituted-in-china-2021-04-16',
//   parent_id: 26849761,
//   created_at_i: 1618720396,
//   _tags: [Array],
//   objectID: '26849841',
//   _highlightResult: [Object]
// },
