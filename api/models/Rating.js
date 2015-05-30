var Rating = {
	connection: 'mongo',
	schema: true,

	attributes: {
		value: {
			type: 'integer',
			required: true
//			,
//			enum: [-1, 1]
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
