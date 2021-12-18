const { TaskRepository } = require("../../../repositories/Task/TaskRepository/TaskRepository");

module.exports = class GetTasksRules {

	constructor(){
		this.repository = new TaskRepository();
	}

	async execute(userId){
		return await this.repository.getTasks(userId);
	}
};