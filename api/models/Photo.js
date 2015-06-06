var md5 = require('MD5');

// Post Entity
var Photo = {
	connection: 'mongo',
	schema: true,

	attributes: {

		caption: {
			type: 'string',
			required: false
		},

		owner: {
			model: 'User',
			required: true
		},

		ratings: {
			collection: 'Rating',
			via: 'photo'
		},

		url: {
			type: 'string',
			required: true
		},

		rating_ups: {
			type: 'integer',
			defaultsTo: 0
		},

		rating_downs: {
			type: 'integer',
			defaultsTo: 0
		},

		calcScore: function() {
			return Photo.calcScore(this);
		},

		toJSON: function() {
			var obj = this.toObject();

			obj.score = this.calcScore();
			obj.url   = 'http://sexytime.felixmilea.com/image/' + this.id + '.png';

			return obj;
		}

	},

	beforeCreate: function(value, cb) {
		var key = value.owner + '/' + md5(value.url);

		sails.hooks.s3.saveImage(value.url, key, function(err, data) {
			if (err) sails.log.error(err);
			sails.log.debug(data);

			cb();
		});
	},

	calcScore: function(photo) {
		return photo.rating_ups / (photo.rating_ups + photo.rating_downs);
	}

};

module.exports = Photo;
