module.exports = class adaptResponse {

	static async ok(response){
		return {
			statusCode: 200,
			response: response
		};
	}
};