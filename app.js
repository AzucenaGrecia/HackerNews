const fetch = require('node-fetch');

fetch('https://google.com')
    .then(res => res.json())
    .then(text => console.log(text))