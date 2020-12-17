/* Simple node.js server to serve files on port 3000
 * by running node index.js */

const http = require("http");
const fs = require("fs");
const path = require("path");

http
  .createServer(function (req, res) {
    var filePath = "." + req.url;
    if (filePath == "./") filePath = "./src/index.html";

    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
      ".html": "text/html",
      ".js": "text/javascript",
      ".css": "text/css",
      ".jpg": "image/jpg",
      ".svg": "image/svg+xml",
    };

    var contentType = mimeTypes[extname] || "application/octet-stream";

    fs.readFile(filePath, function (err, data) {
      if (err) {
        res.writeHead(500);
        res.end(
          "Sorry, check with the site admin for error: " + err.code + " ..\n"
        );
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.write(data);
        return res.end();
      }
    });
  })
  .listen(3000);
