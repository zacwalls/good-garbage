const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
const fs = require('fs');

const key = fs.readFileSync('gunmail-key.txt').toString();


const auth = {
	auth: {
		api_key: key,
		domain: 'sandboxf9906ca5cd7845e4b0f06300cc610a8b.mailgun.org'
	}
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (email, subject, text, cb) => {
	const mailOptions = {
		from: email,
		to: 'goodgarbageinfo@gmail.com',
		subject: subject,
		text: text
	};

	transporter.sendMail(mailOptions, function(err, data) {
		if (err) {
			cb(err, null);
		} else {
			cb(null, data);
		}
	});
};

module.exports = sendMail;