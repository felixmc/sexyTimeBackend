var Rating = {
	connection: 'mongo',
	schema: true,

	attributes: {
		value: {
			type: 'integer',
			required: true
		},

		author: {
			model: 'User',
			required: true
		},

		photo: {
			model: 'Photo',
			required: true
		}

	}
};

module.exports = Rating;
