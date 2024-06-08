const express = require('express');
const helmet = require('helmet'); // Import the Helmet package

const app = express();

// Define the duration for 90 days in seconds
const ninetyDaysInSeconds = 90 * 24 * 60 * 60;

// Mount the helmet.hidePoweredBy() middleware to remove the X-Powered-By header
app.use(helmet.hidePoweredBy());

// Mount the helmet.frameguard() middleware to prevent clickjacking
app.use(helmet.frameguard({ action: 'deny' }));

// Mount the helmet.xssFilter() middleware to protect against XSS attacks
app.use(helmet.xssFilter());

// Mount the helmet.noSniff() middleware to prevent MIME type sniffing
app.use(helmet.noSniff());

// Mount the helmet.ieNoOpen() middleware to set X-Download-Options header to noopen
app.use(helmet.ieNoOpen());

// Mount the helmet.hsts() middleware to enforce HTTPS for the next 90 days
app.use(helmet.hsts({
  maxAge: ninetyDaysInSeconds,
  force: true
}));















































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
