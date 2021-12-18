const { ok } = require("../../../adapters/adapterResponses/adapterResponses");
const CreateTaskRules = require("./CreateTaskRules");

module.exports = new class CreateTaskController {

	async handle(request){

		const { taskName } = request.body;

		const userId = request.userId;

		const createTaskRules = new CreateTaskRules();

		const response = await createTaskRules.execute(userId, taskName); 

		return ok(response);
	}
};