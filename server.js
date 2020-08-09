const express = require('express');
const { body, validationResult } = require('express-validator');
const path = require('path');
const favicon = require('serve-favicon');
const sendMail = require('./mail');

const app = express();
const index = path.join(__dirname, 'index.html');
const PORT = 8080;


app.use(favicon(path.join(__dirname, 'public', 'images', 'gglogo.png')));
app.use(express.static('public'));

app.use(express.urlencoded({
	extended: false
}));

app.use(express.json());


app.post('/email', [
	body('fname').isLength({ min: 1 }),
	body('lname').isLength({ min: 1 }),
	body('email').isEmail(),
	body('message').isLength({ min: 1 })
	], (req, res) => {
	const { email, message } = req.body;
	const errors = validationResult(req);

	let subject = req.body.lname + ', ' + req.body.fname;

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	if (req.body.company) {
		return res.status(400).json({ message: 'Bot detected' });
	}

	sendMail(email, subject, message, function(err, data) {
		if (err) {
			res.status(500).json({ message: 'Internal error' });
		} else {
			res.status(200).json({ message: 'Message sent!' });
		}
	});
});


app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/privacy', (req, res) => {
	res.sendFile(path.join(__dirname, 'privacy.html'));
});

app.listen(PORT, () => console.log('Server is starting on port ', PORT));