var Rating = {
	connection: 'mongo',
	schema: true,

	attributes: {
		value: {
			type: 'integer',
			required: true,
			enum: [-1, 1]
		},

		author: {
			model: 'User'
		},

		photo: {
			model: 'Photo'
		}

	}
};

module.exports = Rating;
