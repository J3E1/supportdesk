const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

//GET /api/tickets
const getTickets = expressAsyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const tickets = await Ticket.find({ user: req.user.id }).sort({
		createdAt: -1,
	});

	res.status(200).json(tickets);
});
//GET /api/ticket/:id
const getTicket = expressAsyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const ticket = await Ticket.findById(req.params.ticketId);

	if (!ticket) {
		res.status(404);
		throw new Error('Ticket not found');
	}

	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not found');
	}
	res.status(200).json(ticket);
});
//DELETE /api/ticket/:id
const deleteTicket = expressAsyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const ticket = await Ticket.findById(req.params.ticketId);

	if (!ticket) {
		res.status(404);
		throw new Error('Ticket not found');
	}

	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not found');
	}

	await ticket.remove();
	res.status(200).json({ success: true });
});

//PUT /api/ticket/:id
const updateTicket = expressAsyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const ticket = await Ticket.findById(req.params.ticketId);

	if (!ticket) {
		res.status(404);
		throw new Error('Ticket not found');
	}

	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not found');
	}

	const updatedTicket = await Ticket.findByIdAndUpdate(
		req.params.ticketId,
		req.body,
		{ new: true }
	);

	res.status(200).json(updatedTicket);
});
//POST /api/tickets
const createTicket = expressAsyncHandler(async (req, res) => {
	const { product, description } = req.body;

	if (!product || !description) {
		res.status(400);
		throw new Error('Required fields are missing');
	}
	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const ticket = await Ticket.create({
		product,
		description,
		user: req.user.id,
	});

	res.status(201).json(ticket);
});

module.exports = {
	createTicket,
	getTickets,
	getTicket,
	deleteTicket,
	updateTicket,
};
