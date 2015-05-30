var bcrypt   = require('bcrypt-nodejs');

var User = {
	connection: 'mongo',
	schema: true,

	attributes: {
		username      : { type: 'string', unique: true, required: true },
		email         : { type: 'string', unique: true, required: true },
		password      : { type: 'string', minLength: 8, required: true },
		rating_average: { type: 'float', defaultsTo: 0 },
		gender        : { type: 'string', enum: ['m', 'f'], required: true },
		wants_gender  : { type: 'array', enum: ['m', 'f'], required: true },
		last_login    : { type: 'datetime' },
		score_private : { type: 'boolean' },
		isNsfw        : { type: 'boolean', required: true },
//		photos        : { collection: 'Photo', via: 'owner' },
//		ratings       : { collection: 'Rating', via: 'author' },

		validPassword : function(password) {
			return bcrypt.compareSync(password, this.password);
		}
	},

	beforeCreate: function(value, cb) {
		value.password = User.generateHash(value.password);
		cb();
	},

	generateHash: function() {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	},

	findNewRating: function() {

	}
};

module.exports = User;
