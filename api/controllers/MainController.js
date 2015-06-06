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
			User.findOne(req.session.user.id, function(err, user) {
				if (err) {
					sails.log.error(err);
					res.json(err);
				} else if (user) {
					user.findNewRating(function(err, photo) {
						if (err) {
							sails.log.error(err);
							res.json(err);
						} else if (photo) {
							res.json(photo);
						} else {
							res.json({ error: "Nothing left to rate :(" });
						}
					});
				} else {
					res.json({ error: "You need to be logged in?" });
				}
			});
		} else {
			res.forbidden();
		}
	}
};

module.exports = MainController;
