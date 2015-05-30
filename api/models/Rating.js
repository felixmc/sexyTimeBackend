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
	},

	afterCreate: function(rating, cb) {
		if (rating.value == 1)
			rating.photo.rating_ups++;
		else
			rating.photo.rating_downs++;

		Photo.update(rating.photo);
	}


};

module.exports = Rating;
