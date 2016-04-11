var browserify = require("browserify");
var fs = require('fs');
var http = require('http');
var path = require('path');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var url = require('url');

var Blog = require('./../build/blog');
var DB = require('./../db/mock_database');

var PORT = 8888;
var STYLESHEETS = ['/styles/stylesheet.css'];
var JAVASCRIPTS = ['build/bundle.js'];

var buildIndexHTML = function() {
  console.log("Blog =", Blog);
  // build head
  var html = "<head></head>";
  // build body
  html += "<body>";
  html += "<div id='blog'>";
  html += ReactDOMServer.renderToString(React.createElement(Blog, {posts: DB.posts}));
  html += "</div>";
  html += "</body>";
  // build footer
  html += "<footer>";
  html += STYLESHEETS.map((file) => `<link href=${file} rel='stylesheet' />`);
  html += JAVASCRIPTS.map((file) => `<script src=${file}></script>`);
  html += "</footer>";
  return html;
};

var transformClientJS = function() {
  console.log("transformClientJS");
  browserify("./client/main.js")
    .transform("babelify", {presets: ["es2015", "react"]})
    .bundle()
    .pipe(fs.createWriteStream("build/bundle.js"));
};

// var transformServerJS = function() {
//   console.log("transformServerJS");
//   browserify("./client/blog.js")
//     .transform("babelify", {presets: ["es2015", "react"]})
//     .bundle()
//     .pipe(fs.createWriteStream("build/blog.js"));
// };

var server = http.createServer((request, response) => {
  var uri = url.parse(request.url).pathname;
  var filename = path.join(process.cwd(), uri);
  console.log(`request url = ${request.url}`);
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
  } else if (path.extname(request.url) === ".js") {
    fs.access(filename, (error) => {
      if (error) {
        console.log(`There was an error trying to read file ${filename}: ${error}`);
      }
      response.writeHead(200, {
        "Content-Type": "application/javascript"
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

transformClientJS();
// transformServerJS();

server.listen(PORT);

console.log(`Listening on port ${PORT}!`);

module.exports = server;
