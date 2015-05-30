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
		console.log(rating.photo);



		Photo.findOne(rating.photo, function(err, photo) {
			if (err) sails.log.error(err);
			if (photo) {
				if (rating.value == 1)
					photo.rating_ups++;
				else
					photo.rating_downs++;

				Photo.update(photo.id, photo, function(err, updated) {
					if (err) sails.log.error(err);
					cb();
				});
			}
		});
	}


};

module.exports = Rating;
