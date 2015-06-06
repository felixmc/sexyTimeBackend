
module.exports = function(req, res, next) {

	req.wantsJSON = true;

	return next();
};
