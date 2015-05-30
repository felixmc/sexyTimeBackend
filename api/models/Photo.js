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
			type: 'int',
			required: false,
			defaultsTo: 0
		},

		rating_downs: {
			type: 'int',
			required: false,
			defaultsTo: 0
		},

		score: {
			type: 'float',
			required: false,
			defaultsTo: 0
		},

		recalculate: function() {
			this.score = this.rating_ups / (this.rating_ups + this.rating_downs);
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

module.exports = Photo;
