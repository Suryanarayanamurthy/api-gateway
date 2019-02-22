const express       = require('express');
const bodyParser    = require("body-parser");
const cookieParser  = require('cookie-parser');
const url           = require('url');
const logger        = require('morgan');
const services      = require('./services.js');
const proxy         = require('./lib/proxy');
const restreamer    = require('./lib/restreamer');
var cors            = require('cors');

// set up the app
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//configure CORS with dynamic domains

//var whitelist = ['stokr-backoffice-frontend','http://stokr-backoffice-frontend','https://backoffice.stokr-staging.de', 'https://stokr.io']
/*var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
*/
//app.use(cors(corsOptions));
app.use(cors());

app.get('/', function(req, res) {
  res.json({
    message: "API Gateway is alive."
  });
});

app.get('/ping', function(req, res) {
  res.json({
    message: "pong"
  });
});


// Bootstrap services
for(let i = 0; i < services.length; i++) {
  const name = services[i].name;
  const host = services[i].host;
  const port = services[i].port;
  const rootPath = services[i].rootPath || "";
  const protocol = services[i].protocol || "http";

  console.log(`Boostrapping service: ${protocol}://${host}:${port}/${rootPath}`);

  let middleware = [];
  if(services[i].middleware) {
    middleware = services[i].middleware.map(text => require(`./middleware/${text}`));
  }

  // need to restream the request so that it can be proxied
  middleware.push(restreamer());

  app.use(`/api/v1/${name}*`, middleware, (req, res, next) => {
    const newPath = url.parse(req.originalUrl).pathname.replace(`/api/v1/${name}`, rootPath);
    let targetUrl = protocol+"://"+host+":"+port+"/"+newPath;
    console.log("Redirected to:"+targetUrl);
    proxy.web(req, res, { target: `${protocol}://${host}:${port}/${newPath}` }, next);
  });
}

module.exports = app;
