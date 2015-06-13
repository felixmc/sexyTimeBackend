var Rating = {
	connection: 'mongo',
	schema: true,

	attributes: {
		weight: {
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
		sails.log.debug('rating photo ', rating.photo);

		Photo.findOne(rating.photo, function(err, photo) {
			if (err) sails.log.error(err);
			else if (photo) {
				if (rating.weight == 1)
					photo.rating_ups++;
				else
					photo.rating_downs++;

				photo.rating_total++;

				photo.save(function(err, updated) {
					if (err) sails.log.error(err);
				});
			} else {
				sails.log.error('photo not found?? ', rating.photo);
			}

			cb();
		});

	}

};

module.exports = Rating;
