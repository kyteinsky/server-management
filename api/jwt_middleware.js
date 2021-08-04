// '/api/jwt' route

const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET

const verifyToken = (req, res, next) => {
	// const token = req.headers.cookie.substring(req.headers.cookie.indexOf('=') + 1, req.headers.cookie.length);
	const token =
		req.body?.access_token || req.query?.access_token || req.headers["x-access-token"] || req.headers?.authorization;

	if (!token) {
		return res.status(403).send("A token is required for authentication");
	}
	try {
		const decoded = jwt.verify(token, secret);
		req.user = decoded;
	} catch (err) {
		return res.status(401).send("Invalid Token");
	}

	// check if the role is admin
	if (req.user.role !== 'ADMIN')
		return res.status(403).send("You are not authorized to perform this action");

	return next();
};

module.exports = verifyToken;
