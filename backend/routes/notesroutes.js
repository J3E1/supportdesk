const express = require('express');
const protectRoute = require('../middleware/authMiddleware');

const router = express.Router({ mergeParams: true });

const {
	getNotes,
	postNotes,
	getNote,
	deleteNote,
	updateNote,
} = require('../controllers/notesController');

router.route('/').get(protectRoute, getNotes).post(protectRoute, postNotes);
router
	.route('/:noteId')
	.get(protectRoute, getNote)
	.put(protectRoute, updateNote)
	.delete(protectRoute, deleteNote);

module.exports = router;
