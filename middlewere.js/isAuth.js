const jwt = require('jsonwebtoken')
const createError = require('http-errors')

function isAuth(req, res, next) {
	const authHeader = req.headers['authorization']
	let token;
	if(authHeader) {
		token = authHeader.split(' ')[1]
	}

	if(!token) {
        return next(createError(401, 'No token attached' ));
	}

	jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
		if(err) {
			if(err.name === 'TokenExpiredError') {
                return next(createError(401, 'Token has expired' ));
			};
			if(err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
                return next(createError(401, 'Invalid signature'));
			};
			if(err.name === 'JsonWebTokenError' && err.message === 'jwt malformed') {
                return next(createError(401, 'Malformed token' ));
			};
		};
		req.user = decoded.sub
		next();
	});
};

module.exports = isAuth;

