var bcrypt   = require('bcrypt-nodejs');

var UserModel = {
	connection: 'mongo',
	schema: true,

	attributes: {
		username      : { type: 'string', unique: true, required: true },
//		email         : { type: 'string', unique: true, required: true },
		password      : { type: 'string', minLength: 8, required: true },
		gender        : { type: 'string', enum: ['m', 'f'], required: true },
		wants_gender  : { type: 'array', enum: ['m', 'f'], required: true },
		last_login    : { type: 'datetime' },
		score_private : { type: 'boolean' },
		isNsfw        : { type: 'boolean', required: true },
		photos        : { collection: 'Photo', via: 'owner' },
		ratings       : { collection: 'Rating', via: 'author' },

		validPassword : function(password) {
			return bcrypt.compareSync(password, this.password);
		},

		calcScore: function() {
			return this.photos.length ? _.reduce(this.photos, function(total, p) { return total + Photo.calcScore(p) }, 0) / this.photos.length : 0;
		},

		findNewRating: function(cb) {
			// get all photo ids from my ratings
			// find photo that is not in that set of photo ids

			Rating.find({ author: this.id }, function(err, ratings) {
				if (err) sails.log.error(err);
				var ratedPhotos = _.map(ratings, function(rating) {
					return rating.photo;
				});

				Photo.findOne({ id: { '!': ratedPhotos } }, cb);
			});
		},

		toJSON: function() {
			var obj = this.toObject();
			delete obj.password;

			obj.score = this.calcScore();

			return obj;
		}
	},

	beforeCreate: function(value, cb) {
		value.password = User.generateHash(value.password);
		cb();
	},

	generateHash: function(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	},

	authenticate: function(username, password, cb) {
		User.findOne({ username: username }, function(err, user) {
			if (err) sails.log.error(err);
			if (user && user.validPassword(password)) cb(user)
			else cb()
		});
	}
};

module.exports = UserModel;
