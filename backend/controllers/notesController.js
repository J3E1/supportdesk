const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');
const Note = require('../models/notesModel');
const mongoose = require('mongoose');
// GET api/tickets/:ticketId/notes
const getNotes = expressAsyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const ticket = await Ticket.findById(req.params.ticketId);

	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}
	const notes = await Note.find({ ticket: req.params.ticketId }).sort({
		updatedAt: -1,
	});

	res.status(200).json(notes);
});
// GET api/tickets/:ticketId/notes/:noteId

const getNote = expressAsyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const ticket = await Ticket.findById(req.params.ticketId);

	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}
	const note = await Note.findById(req.params.noteId);

	res.status(200).json(note);
});
// POST api/tickets/:ticketId/notes/:noteId
const postNotes = expressAsyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const ticket = await Ticket.findById(req.params.ticketId);

	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}
	const note = await Note.create({
		text: req.body.text,
		isStaff: false,
		user: req.user._id,
		ticket: req.params.ticketId,
	});

	res.status(201).json(note);
});
//DELETE /api/ticket/:id/notes/:notesId
const deleteNote = expressAsyncHandler(async (req, res) => {
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
	const note = await Note.findById(req.params.noteId);

	res.status(200).json(note);
	await note.remove();
});

//PUT /api/ticket/:id/notes/:notesId
const updateNote = expressAsyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const ticket = await Ticket.findById(req.params.ticketId);

	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}
	// let id = mongoose.Types.ObjectId(req.params.noteId);
	const updatedNote = await Note.findByIdAndUpdate(
		req.params.noteId,

		req.body,

		{
			new: true,
		}
	);

	res.status(200).json(updatedNote);
	console.log(
		'🚀 ~ file: notesController.js:123 ~ updateNote ~ req.body',
		req.body
	);
});

module.exports = { getNotes, postNotes, updateNote, deleteNote, getNote };
