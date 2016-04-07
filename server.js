var HTTP = require('http');
var port = 8888;

var server = HTTP.createServer((request, response) => {
  response.writeHead(200, {
    "Content-Type": "text/html"
  });
  response.write('<html>');
  response.write('<body>');
  response.write('<h1>Hello, World!</h1>');
  response.write('</body>');
  response.write('</html>');
  response.end();
});

server.listen(port);

console.log(`Listening on port ${port}!`);

module.exports = server;
