'use strict';

var MainController = {
	index: function(req, res) {

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
		Photo.findOne();
	}
};

module.exports = MainController;
