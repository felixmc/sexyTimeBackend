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
		console.log(rating.photo);

		Photo.findOne(rating.photo, function(err, photo) {
			if (err) sails.log.error(err);
			if (photo) {
				if (rating.weight == 1)
					this.rating_ups++;
				else
					this.rating_downs++;

				this.rating_total++;

				Photo.update(photo.id, photo, function(err, updated) {
					if (err) sails.log.error(err);
					cb();
				});
			}
		});

	}

};

module.exports = Rating;
