var AWS = require('aws-sdk');

module.exports = function(sails) {

	var bucket;

	return {

		configure: function configure() {
			console.log(sails.config.aws);

			AWS.config.update(sails.config.aws);
		},

		initialize: function initialize(cb) {
			var bucket = new AWS.S3( { params: { Bucket: 'myBucket' } } );

			return cb();
		},

		saveImage: function saveImage(rawData, photoId, cb) {
			var buffer = new Buffer(rawData.replace(/^data:image\/\w+;base64,/, ''),'base64');

			var data = {
				Key: photoId,
				Body: buffer,
				ContentEncoding: 'base64',
				ContentType: 'image/jpeg'
			};

			bucket.putObject(data, cb);
		}


	};
};
