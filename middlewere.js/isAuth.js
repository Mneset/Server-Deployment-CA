const jwt = require('jsonwebtoken')

function isAuth(req, res, next) {
	const authHeader = req.headers['authorization']
	let token;
	if(authHeader) {
		token = authHeader.split(' ')[1]
	}

	if(!token) {
		return res.status(401).json({
			statusCode: 401,
			result: {message: 'No token attached'}}
		);
	}

	jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
		if(err) {
			if(err.name === 'TokenExpiredError') {
				return res.status(401).json({
					statusCode: 401,
					result: {message: 'Token has expired'}}
				);
			};
			if(err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
				return res.status(401).json({
					statusCode: 401,
					result: {message: 'Invalid signature'}}
				)
			};
			if(err.name === 'JsonWebTokenError' && err.message === 'jwt malformed') {
				return res.status(401).json({
					statusCode: 401,
					result: {message: 'Malformed token'}}
				);
			};
		};
		req.user = decoded.sub
		next();
	});
};

module.exports = isAuth;

