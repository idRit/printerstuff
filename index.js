const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var storage = multer.diskStorage({
	destination: './uploads/',
	filename: function (req, file, cb) {
		crypto.pseudoRandomBytes(16, function (err, raw) {
			if (err) return cb(err)

			cb(null, file.originalname)
		})
	}
})

var upload = multer({ storage: storage }).array('files', 12);

const app = new express();

app.use(cors());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb', extended: true}));

// Configuring the database
const dbConfig = require('./config/database.config');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    dbName: "printerstuff"
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

app.get('/', (req, res) => {
	return res.json({
		success: true,
		message: "working"
	});
});

app.get('/test', async (req, res) => {
	return res.sendFile(__dirname + '/index.html');
});

app.post('/upload', upload, async (req, res) => {
	console.log(req.files);
	res.json({
		success: true,
		message: "uploaded"
	});
});

require('./api/routes/vendors.routes')(app);
require('./api/routes/files.routes')(app, upload);

let server = app.listen(process.env.PORT || 3000, () => {
	console.log('listening on ' + process.env.PORT || 3000);
});

require('./api/sockets/main.socket')(server);
