const { TaskRepository } = require("../../../repositories/Task");

module.exports = class FinishTaskRules {
    
	constructor(){
		this.repository = new TaskRepository();
	}

	async execute(id, userId){

		await this.repository.finishTask(id, userId);
	}
};