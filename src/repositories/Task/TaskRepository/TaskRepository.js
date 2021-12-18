const TaskModel = require("../../../database/models/Task");

class TaskRepository {

	async create(userId, id, taskName) {
		await TaskModel.create({
			id: id,
			userId: userId,
			taskName: taskName
		});
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
		});
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
		);
	}

	async getTasks(userId) {

		const task = await TaskModel.findAll({
			attributes: ["id", "taskName", "status"],
			where: {
				userId: userId
			}
		});

		return task;
	}
}

module.exports = {
	TaskRepository,
};