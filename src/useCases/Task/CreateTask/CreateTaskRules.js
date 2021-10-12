const { MissingParamError } = require("../../../utils/errors/index");

const Helper = require("../../../utils/helper/Helper");
const { TaskRepository } = require("../../../repositories/Task");

module.exports = class CreateTaskRules {
    
	constructor(){
		this.repository = new TaskRepository();
	}

	async execute(userId, taskName){

		if(!taskName)
			return new MissingParamError("Preencha o nome da tarefa");

		await this.repository.create(userId, Helper.createId(), taskName);
	}
};