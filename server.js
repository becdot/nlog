var HTTP = require('http');
var React = require('react');
var ReactDOMServer = require('react-dom/server');

var HelloWorld = require('./build/hello_world');
var port = 8888;

var server = HTTP.createServer((request, response) => {
  response.writeHead(200, {
    "Content-Type": "text/html"
  });
  var markup = React.createElement(HelloWorld);
  response.write(ReactDOMServer.renderToString(markup));
  response.end();
});

server.listen(port);

console.log(`Listening on port ${port}!`);

module.exports = server;
