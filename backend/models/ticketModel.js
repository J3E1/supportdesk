const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.SchemaTypes.ObjectId,
			required: true,
			ref: 'User',
		},
		product: {
			type: String,
			required: [true, 'Please select a product'],
			enum: ['iPhone', 'iPad', 'iPod', 'MacBook'],
		},
		description: {
			type: String,
			required: [true, 'Please enter description for the issue'],
		},
		status: {
			type: String,
			required: true,
			enum: ['new', 'pending', 'open', 'closed'],
			default: 'new',
		},
	},
	{
		timestamps: true,
	}
);
module.exports = mongoose.model('Ticket', ticketSchema);
