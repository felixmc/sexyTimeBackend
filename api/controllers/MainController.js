'use strict';

var MainController = {
	index: function(req, res) {
		return res.send('Welcome to SexyTime v0.1');
	},
	status: function(req, res) {
		res.end( 'You are ' + (req.session.user ? 'logged in as ' + req.session.user.username + '.' : 'not logged in.') );
	},
	upload: function(req, res) {
		if (req.session.user) {
			var photoData = req.body;
			photoData.owner = req.session.user.id;

			Photo.create(photoData)
				.exec(function(err, photo) {
					if (err) {
						sails.log.error(err);
						return res.serverError(err);
					} else if (photo) {
						return res.json(photo);
					} else {
						return res.badRequest();
					}
				});
		} else {
			res.forbidden();
		}
	},
	rate: function(req, res) {
		if (req.session.user) {
			if (req.method === 'GET') {
				User.findPhotoToRate(req.session.user.id, function(err, photo) {
					if (err) {
						sails.log.error(err);
						return res.serverError(err);
					} else if (photo) {
						return res.json(photo);
					} else {
						return res.status(404).json({ error: 'No photos to rate.' });
					}
				});
			} else if (req.method === 'POST') {
				var data = req.body;
				if (data.value && data.photo) {
					sails.log.debug('raw data: ', { author: req.session.user.id, photo: data.photo, value: data.value });
					Rating.create({ author: req.session.user.id, photo: data.photo, value: data.value }).exec(function(err, rating) {
						if (err) {
							sails.log.error(err);
							return res.serverError(err);
						} else {
							rating.photo.addRating(rating);
							rating.photo.save().exec(function(err, photo) {
								if (err) {
									sails.log.error(err);
									return res.serverError(err);
								} else {
									return res.json(photo);
								}
							});
						}
					});
				} else {
					return res.badRequest();
				}
			} else {
				return res.badRequest();
			}
		} else {
			return res.forbidden();
		}
	}
};

module.exports = MainController;
