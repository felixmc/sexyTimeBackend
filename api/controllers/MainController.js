'use strict';

var MainController = {
	index: function(req, res) {
		return res.send('Welcome to SexyTime v0.1');
	},
	status: function(req, res) {
		res.end( 'You are ' + (req.session.user ? 'logged in as ' + req.session.user.username + '.' : 'not logged in.') );
	},
	login: function(req, res) {
		var data = req.body || {};
		User.authenticate(data.username, data.password, function(user) {
			if (user) {
				req.session.user = {
					id: user.id,
					username: user.username
				};
			}

			res.end('login success: ' + (!!user));
		});
	},
	logout: function(req, res) {
		req.session.destroy();
		res.end('success');
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
			res.json({ error: "You need to be logged in." });
		}
	}
};

module.exports = MainController;
