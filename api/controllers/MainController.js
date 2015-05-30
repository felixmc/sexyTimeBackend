'use strict';

var MainController = {
	index: function(req, res) {

	},
	login: function(req, res) {
		var data = req.body || {};
		User.authenticate(data.username, data.password, function(success) {
			res.end('login success: ' + success);
		});
	},
	rate: function(req, res) {
		Photo.findOne();
	}
};

module.exports = MainController;
