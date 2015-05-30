// Post Entity
var Post = {
	connection: 'mongo',
	schema: true,

	attributes: {

		caption: {
			type: 'string',
			required: false
		},

		author: {
			model: 'User',
			required: true
		},

		ratings: {
			collection: 'Rating',
			via: 'photo'
		},

		score: {
			type: 'float',
			required: false,
			defaultsTo: 0
		},

		isNsfw: {
			type: 'boolean',
			required: true
		},

		isPrivate: {
			type: 'boolean',
			required: false
		},

		dateCreated: {
			type: 'datetime'
		}

//		calculateScore: function () {
//			this.score = _.reduceRight(this.votes, function (sum, next) {
//				return sum + next.value;
//			}, 0);
//			return this.score;
//		},
//
//		url: function() {
//			return 'http://stiikr.com/post/' + this.id;
//		}

	}

};

module.exports = Post;
