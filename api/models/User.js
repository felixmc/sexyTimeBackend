var User = {
	connection: 'mongo',
	schema: true,

	attributes: {
		username      : { type: 'string', unique: true },
		email         : { type: 'string', unique: true },
		password_hash : { type: 'string' },
		password_salt : { type: 'string' },
		rating_average: { type: 'float' },
		gender        : { type: 'string', enum: ['m', 'f'] },
		wants_gender  : { type: 'array', enum: ['m', 'f'] },
		date_created  : { type: 'datetime' },
		last_login    : { type: 'datetime' },
		score_private : { type: 'boolean' },
		isNsfw        : { type: 'boolean' },
		photos        : { collection: 'Photo', via: 'owner' },
		ratings       : { collection: 'Rating', via: 'author' }
	},

	findNewRating: function() {

	}
};

module.exports = User;
