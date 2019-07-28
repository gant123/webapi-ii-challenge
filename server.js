const express = require('express');
const postsRouter = require('./posts/post-router');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h1> API is working at the momoment ;)</h1>`);
});

server.use('/api/posts', postsRouter);

module.exports = server;
