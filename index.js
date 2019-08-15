const server = require('./server.js');

server.listen((port = 4000), () => {
  console.log(`\nListening on port ${port}`);
});
