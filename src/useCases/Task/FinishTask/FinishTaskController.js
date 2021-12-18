const { ok } = require("../../../adapters/adapterResponses/adapterResponses");
const FinishTaskRules = require("./FinishTaskRules");

module.exports = new class FinishTaskController {

	async handle(request){

		const { id } = request.params;

		const userId = request.userId;

		const finishTaskRules = new FinishTaskRules();

		const response = await finishTaskRules.execute(id, userId);

		return ok(response);
	}
};