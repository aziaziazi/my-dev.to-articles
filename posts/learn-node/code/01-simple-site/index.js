var http = require('http');
var url = require('url');
var fs = require('fs');

var writeAndEnd = function (res, data) {
  res.write(data);
  res.end();
};

http
  .createServer((req, res) => {
    var pathname = url.parse(req.url, true).pathname;
    if (pathname === '/') pathname = '/index.html'; // handle root path

    fs.readFile(`.${pathname}`, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        fs.readFile('404.html', (err, data) => {
          if (err) {
            writeAndEnd(res, '404 not handled :('); //
          } else {
            writeAndEnd(res, data);
          }
        });
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        writeAndEnd(res, data);
      }
    });
  })
  .listen(8080);
