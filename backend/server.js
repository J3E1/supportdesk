const express = require('express');
const errorHandler = require('./middleware/errorMiddleware');
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

const corsOptions = {
	origin: '*',
	// credentials: true, //access-control-allow-credentials:true
	// optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.status(200).send({ message: 'Welcome to supportdesk!' });
});

//Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

app.use(errorHandler);

app.listen(PORT, () => console.log(('Server started on ' + PORT).green.bold));
