'use strict';

var AuthController = {
	status: function(req, res) {
		return res.json({ isAuth: !!(req.session.user) });
	},
	me: function(req, res) {
		if (req.session.user) {
			User.find(req.session.user.id)
			.done(function(err, user) {
				if (err) {
					return res.send(err);
				} else {
					return res.json(user.toMinJSON());
				}
			});
		} else {
			return res.forbidden();
		}
	},
	signup: function(req, res) {
		var userData = req.body;

		User.create(userData)
			.exec(function(err, user) {
				if (user) {
					return res.send(err);
				} else if (user) {
					req.session.user = user.toMinJSON();
					console.log(user);
					return res.json(user.toJSON(true));
				} else {
					return res.badRequest();
				}
			});
	},
	login: function(req, res) {
		var data = req.body || {};
		User.authenticate(data.userId, data.secret, function(user) {
			if (user) {
				req.session.user = user.toMinJSON();
			}

			return res.json({ status: !!user });
		});
	},
	logout: function(req, res) {
		req.session.destroy();
		return res.json({ status: 'success' });
	}
};

module.exports = AuthController;
