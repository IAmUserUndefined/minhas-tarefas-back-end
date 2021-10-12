const { InvalidParamError, MissingParamError, UnauthorizedError } = require("../utils/errors/index");

module.exports = (router) => {

	return async (req, res) => {

		const { response, statusCode } = await router({
			body: req.body,
			query: req.query,
			params: req.params,
			headers: req.headers,
			userId: req.userId
		});

		if (response instanceof UnauthorizedError)
			return res.status(401).json({ response: response.message });

		if (response instanceof InvalidParamError || response instanceof MissingParamError)
			return res.status(400).json({ response: response.message });

		if (response instanceof Error)
			return res.status(500).json({ response: response.message });

		return res.status(statusCode).json({ response: response });

	};
};