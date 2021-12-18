const { ok } = require("../../../adapters/adapterResponses/adapterResponses");
const GetTasksRules = require("./GetTasksRules");

module.exports = new class GetTasksController {

	async handle(request){

		const userId = request.userId;

		const getTasksRules = new GetTasksRules();

		const response = await getTasksRules.execute(userId);

		return ok(response);
	}
};