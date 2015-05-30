var User = {
	connection: 'mongo',
	schema: true,

	attributes: {
		username      : { type: 'string', unique: true, required: true },
//		email         : { type: 'string', unique: true, required: true },
//		password_hash : { type: 'string' },
//		password_salt : { type: 'string' },
		rating_average: { type: 'float', defaultsTo: 0 },
		gender        : { type: 'string', enum: ['m', 'f'], required: true },
		wants_gender  : { type: 'array', enum: ['m', 'f'], required: true }//,
//		date_created  : { type: 'datetime' },
//		last_login    : { type: 'datetime' },
//		score_private : { type: 'boolean' },
//		isNsfw        : { type: 'boolean', required: true },
//		photos        : { collection: 'Photo', via: 'owner' },
//		ratings       : { collection: 'Rating', via: 'author' }
	},

	findNewRating: function() {

	}
};

module.exports = User;
