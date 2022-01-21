const TaskModel = require("../../../database/models/Task");

class TaskRepository {

	async create(userId, id, taskName) {
		await TaskModel.create({
			id: id,
			userId: userId,
			taskName: taskName
		}).catch(err => console.log(err));
	}

	async delete(userId, id) {
		const { Op } = require("sequelize");
		await TaskModel.destroy({
			where: {
				[Op.and]: [
					{ id: id },
					{ userId: userId }
				]
			}
		}).catch(err => console.log(err));
	}

	async finishTask(id, userId){
		const { Op } = require("sequelize");
		await TaskModel.update(
			{ status: true },
			{
				where: {
					[Op.and]: [
						{ id: id },
						{ userId: userId }
					]
				}
			}
		).catch(err => console.log(err));
	}

	async getTasks(userId) {

		const task = await TaskModel.findAll({
			attributes: ["id", "taskName", "status"],
			where: {
				userId: userId
			},
			order:[
				[
					"createdAt", "ASC"
				]
			]
		}).catch(err => console.log(err));

		return task;
	}
}

module.exports = {
	TaskRepository,
};