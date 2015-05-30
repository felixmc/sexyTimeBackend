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

		isNsfw: {
			type: 'boolean',
			required: true
		},

		isPrivate: {
			type: 'boolean',
			required: false
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

			return obj;
		}

	},

	calcScore: function(photo) {
		return photo.rating_ups / (photo.rating_ups + photo.rating_downs);
	}

};

module.exports = Photo;
