'use strict';

var AuthController = {
	index: function(req, res) {
		return res.json({ isAuth: !!(req.session.user) });
	},
	me: function(req, res) {
		if (req.session.user) {
			User.findOne(req.session.user.id)
			.exec(function(err, user) {
				if (err) {
					return res.send(err);
				} else if (user) {
					return res.json(user.toMinJSON());
				} else {
					return res.badRequest();
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
				if (err) {
					return res.send(err);
				} else if (user) {
					req.session.user = user.toMinJSON();
					return res.json(user.toJSON(true));
				} else {
					return res.badRequest();
				}
			});
	},
	login: function(req, res) {
		var data = req.body || {};
		if (data.userId && data.secret) {
			User.authenticate(data.userId, data.secret, function(user) {
				if (user) {
					req.session.user = user.toMinJSON();
				}

				return res.json({ status: !!user });
			});
		} else {
			return res.badRequest();
		}
	},
	logout: function(req, res) {
		req.session.destroy();
		return res.json({ status: 'success' });
	}
};

module.exports = AuthController;
