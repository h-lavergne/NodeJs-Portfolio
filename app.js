// Full Documentation - https://www.turbo360.co/docs
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID});
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID});
const path = require('path');
const nodeMailer = require('nodemailer');

const config = {
	views: 'views', 	// Set views directory
	static: 'public', // Set static assets directory
	db: vertex.nedbConfig((process.env.TURBO_ENV=='dev') ? 'nedb://'+path.join(__dirname, process.env.TMP_DIR) : 'nedb://'+process.env.TMP_DIR)
};

const app = vertex.app(config); // initialize app with config options
app.use(vertex.setContext(process.env)); // set CDN and global object on 'req.config' and 'req.site' object

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;



// import routes
const page = require('./routes/page');
const main = require('./routes/main');
const vertexRouters = require('./routes/vertex');
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

// set routes
//app.use('/', page);
app.use('/', main);
app.use('/api', vertexRouters.api);
app.use('/blocks', vertexRouters.blocks);


app.post('/send-email', (req, res) => {
	let transporter = nodeMailer.createTransport({
		service: 'gmail',
		auth: {
			user: GMAIL_USER,
			pass: GMAIL_PASSWORD

		} 
	});

	const mailOptions = {
		from: 'Info Here', // sender address
		to: 'contactportfoliohugo@gmail.com', // list of receivers
		subject: 'Collabrator Mail', // Subject line
		html: `Here is a message from <strong>${req.body.name}</strong> <br> you can contact him back at the following email: <strong>${req.body.email}</strong> <br><br> <strong>Message</strong> : <br> ${req.body.message}`// plain text body
	  };

	  transporter.sendMail(mailOptions, (error, info) => {})
})


module.exports = app
