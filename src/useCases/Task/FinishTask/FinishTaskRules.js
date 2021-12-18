const { TaskRepository } = require("../../../repositories/Task/TaskRepository/TaskRepository");

module.exports = class FinishTaskRules {
    
	constructor(){
		this.repository = new TaskRepository();
	}

	async execute(id, userId){

		await this.repository.finishTask(id, userId);
	}
};