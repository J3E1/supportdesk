const express = require('express');
const protectRoute = require('../middleware/authMiddleware');
const {
	getTickets,
	createTicket,
	getTicket,
	deleteTicket,
	updateTicket,
} = require('../controllers/ticketController');

const router = express.Router();

const noteRouter = require('./notesRoutes');
router.use('/:ticketId/notes/', noteRouter);

router
	.route('/')
	.get(protectRoute, getTickets)
	.post(protectRoute, createTicket);

router
	.route('/:ticketId')
	.get(protectRoute, getTicket)
	.delete(protectRoute, deleteTicket)
	.put(protectRoute, updateTicket);

module.exports = router;
