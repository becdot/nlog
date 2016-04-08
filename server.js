var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var React = require('react');
var ReactDOMServer = require('react-dom/server');

var Blog = require('./build/blog');
var DB = require('./mock_database');

var PORT = 8888;
var STYLESHEETS = ['/styles/stylesheet.css'];

var buildIndexHTML = function() {
  // build head
  var html = "<head>";
  html += STYLESHEETS.map((file) => `<link href=${file} rel='stylesheet' />`);
  html += "</head>";
  // build body
  html += "<body";
  html += ReactDOMServer.renderToString(React.createElement(Blog, {posts: DB.posts}));
  html += "</body>";
  return html;
};

var server = http.createServer((request, response) => {
  var uri = url.parse(request.url).pathname;
  var filename = path.join(process.cwd(), uri);
  if (request.url === "/") {
    response.writeHead(200, {
      "Content-Type": "text/html"
    });
    response.end(buildIndexHTML());
  } else if (path.extname(request.url) === ".css") {
    fs.access(filename, (error) => {
      if (error) {
        console.log(`There was an error trying to read file ${filename}`);
      }
      response.writeHead(200, {
        "Content-Type": "text/css"
      });
      fs.readFile(filename, (err, data) => {
        response.end(data);
      });
    });

  } else {
    console.log(`Received an unknown request for ${request.url}`);
    response.end();
  }
});

server.listen(PORT);

console.log(`Listening on port ${PORT}!`);

module.exports = server;
