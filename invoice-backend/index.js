express = require('express');

router = express.Router();
var app = express();
var path = require('path');
var cors = require('cors');
var db = require('./config/db');
const https = require('https');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
const fs = require('fs');

app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(require('express-session')({
	secret: 'keyboard admin',
	resave: false,
	saveUninitialized: false
}));

var portal_api = require('./routes/webapi/v1/portal/portal_index');
app.use('/', portal_api);

// app.listen('4201', function(){
//
// });

https.createServer({
	key: fs.readFileSync('./selfsigned/test-dev.rovuk.us_2021.key'),
	cert: fs.readFileSync('./selfsigned/test-dev.rovuk.us_2021.crt')
}, app).listen(4206, () => {

	console.log('Example App Listening on port 4206');
});
DB = module.exports = new db();
PROJECTROOT = module.exports = __dirname;