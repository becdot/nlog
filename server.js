var HTTP = require('http');
var React = require('react');
var ReactDOMServer = require('react-dom/server');

var Blog = require('./build/blog');
var DB = require('./mock_database');
var port = 8888;

var server = HTTP.createServer((request, response) => {
  response.writeHead(200, {
    "Content-Type": "text/html"
  });
  var markup = React.createElement(Blog, {posts: DB.posts});
  response.end(ReactDOMServer.renderToString(markup));
});

server.listen(port);

console.log(`Listening on port ${port}!`);

module.exports = server;
