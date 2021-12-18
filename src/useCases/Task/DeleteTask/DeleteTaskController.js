const { ok } = require("../../../adapters/adapterResponses/adapterResponses");
const DeleteTaskRules = require("./DeleteTaskRules");

module.exports = new class DeleteTaskController {
    
	async handle(request){

		const { id } = request.params;

		const userId = request.userId;

		const deleteTaskRules = new DeleteTaskRules();

		const response = await deleteTaskRules.execute(userId, id);

		return ok(response);
	}
};