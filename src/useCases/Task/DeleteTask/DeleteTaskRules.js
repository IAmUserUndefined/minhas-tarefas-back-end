const { TaskRepository } = require("../../../repositories/Task");

module.exports = class DeleteTaskRules {

	constructor(){
		this.repository = new TaskRepository();
	}

	async execute(userId, id){

		await this.repository.delete(userId, id);
	}
};