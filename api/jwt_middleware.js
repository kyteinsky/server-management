// '/api/jwt' route

const jwt = require('jsonwebtoken');
if (process.env.NODE_ENV !== 'production')
	require('dotenv').config()
const secret = process.env.JWT_SECRET || 'secret'


const verifyToken = (req, res, next) => {
	const token =
		req.body?.token || req.query?.token || req.headers["x-access-token"];

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
