const jwt = require('jsonwebtoken');
const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protectRoute = expressAsyncHandler(async (req, res, next) => {
	let token;
	if (req.headers.authorization?.startsWith('Bearer ')) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await User.findById(decoded.id).select('-password');

			next();
		} catch (error) {
			console.log(error);
			res.status(401);
			throw new Error('Unauthorized');
		}
	}
	if (!token) {
		res.status(401);
		throw new Error('Unauthorized');
	}
});
module.exports = protectRoute;
