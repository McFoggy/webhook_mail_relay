'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

// Constants
const PORT = 8080;

var app = express();
app.use(bodyParser.urlencoded({extended: false}));

var smtp_server = process.env.SMTP_HOST;
var smtp_port = process.env.SMTP_PORT;
var smtp_user = process.env.SMTP_USER;
var smtp_password = process.env.SMTP_PASSWORD;
var smtp_from = process.env.SMTP_FROM;
var smtp_to = process.env.SMTP_TO;
var active = !(process.env.TEST_ONLY === 'true');

var smtpOptions = {
    host: smtp_server,
    port: smtp_port,
};

// need auth ?
if (smtp_user) {
	smtpOptions.auth = {
        user: smtp_user,
        pass: smtp_password
	}
}

var transporter = nodemailer.createTransport(smtpOptions)

app.post('/', function(req, res) {
	var payloadStr = req.body.payload;
	var payload = JSON.parse(payloadStr);
	
	if (active) {
		var mailOptions = {
			from: smtp_from, // sender address 
			to: smtp_to, // list of receivers 
			subject: 'Detected push on ' + payload.repository.full_name + '[' + payload.ref + ']', // Subject line 
			text: payloadStr // plaintext body 
		};
		
		console.log('Sending notification mail for a push on: ' + payload.repository.full_name + '[' + payload.ref + ']');		
		transporter.sendMail(mailOptions, function(error, info) {
			if(error){
				console.log('failed: ' + JSON.stringify(error));
				res.status(202).send('sending email failed:\n' + JSON.stringify(error));
			} else {
				console.log('succeed');
				res.send('mail sent');
			}
		});
	} else {
		res.send('received:\n' + payloadStr);
	}
});

app.listen(PORT);
console.log('Webhook email relay started.');