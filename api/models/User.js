var bcrypt   = require('bcrypt-nodejs');

var secret = {
	length: 32,
	chars: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
};

var UserModel = {
	connection: 'mongo',
	schema: true,

	attributes: {
		secret            : { type: 'string' },
		gender            : { type: 'string', enum: ['m', 'f'], required: true },
		gender_preference : { type: 'array',  enum: [ ['m'], ['f'], ['m', 'f'], ['f', 'm'] ], required: true },
		last_login        : { type: 'datetime' },
		private           : { type: 'boolean' },
		photos            : { collection: 'Photo', via: 'owner' },
		ratings           : { collection: 'Rating', via: 'author' },

		calcScore: function() {
			return this.photos.length ? _.reduce(this.photos, function(total, p) { return total + Photo.calcScore(p) }, 0) / this.photos.length : 0;
		},

		toJSON: function(showSecret) {
			var obj = this.toObject();

			if (!showSecret)
				delete obj.secret;

			obj.score = this.calcScore();

			return obj;
		},

		toMinJSON: function() {
			var obj = this.toObject();

			delete obj.photos;
			delete obj.ratings;
			delete obj.secret;

			return obj;
		}
	},

	generateSecret: function() {
		var result = '';
		for (var i = secret.length; i > 0; --i) result += secret.chars[Math.round(Math.random() * (secret.chars.length - 1))];
		return result;
	},

	beforeCreate: function(value, cb) {
		value.secret = User.generateSecret();
		cb();
	},

	authenticate: function(userId, secret, cb) {
		User.findOne(userId, function(err, user) {
			if (err) sails.log.error(err);
			if (user && user.secret && user.secret === secret) cb(user)
			else cb()
		});
	},

	findPhotoToRate: function(userId, cb) {
		User.findOne(userId, function(err, user) {
			if (err) return cb(err);
			else if (user) {
				Rating.find({ author: userId }, function(err, ratings) {
					if (err) return cb(err);
					var ratedPhotos = _.map(ratings, function(rating) {
						return rating.photo;
					});

					Photo.findOne({
						where: {
							id:     { '!': ratedPhotos },
							owner:  { '!': userId },
							gender: user.gender_preference
						},
						sort: {
							rating_total: 'ASC',
							createAt:     'ASC'
						}
					}, cb);
				});
			} else {
				return cb(new Error('User not found.'));
			}
		});
	}

};

module.exports = UserModel;
