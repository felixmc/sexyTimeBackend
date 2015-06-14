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
			photoData.owner  = req.session.user.id;
			photoData.gender = req.session.user.gender;

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
		console.log('query: ', req.query);
		if (req.session.user) {
			if (req.method === 'GET') {
				console.log('skip? ', req.query.skip || 0);
				User.findPhotoToRate(req.session.user.id, req.query.skip || 0, function(err, photo) {
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
				if (data.weight && data.photo) {
					sails.log.debug('raw data: ', { author: req.session.user.id, photo: data.photo, weight: data.weight });
					Rating.create({ author: req.session.user.id, photo: data.photo, weight: data.weight }).exec(function(err, rating) {
						if (err) {
							sails.log.error(err);
							return res.serverError(err);
						} else {
							Photo.findOne(rating.photo).exec(function(err, photo) {
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
