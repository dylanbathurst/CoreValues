var connect = require('connect'),
    fs = require('fs'),
    http = require('http'),
    baller = require('../baller-proxy/lib/baller-node');


function setupUrls(app) {

  app.get('/', function (req, res, next) {

    fs.readFile('index.html', 'utf8', function (err, data) {
      if (err) throw err;

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });

  });


  app.get('/api/*?', function (req, res, next) {

    var options = {
      host: 'api.zappos.com',
      port: 80,
      path: req.url.replace('/api', ''),
      method: 'GET'
    };

    baller.proxy(options, function (chunk) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(chunk);
    });
    
  });
}

connect.createServer(
  connect.router(setupUrls),
  connect.static(__dirname + '/public')
).listen(80);



