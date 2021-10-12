const UserModel = require("../database/models/User");
const TaskModel = require("../database/models/Task");

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

class TaskTestRepository {

	async createTestTaskAndUser() {
		await UserModel.create({
			id: "ll98bc1b-22f4-4fc6-be64-3d830068bddc",
			email: "joao@teste.com",
			password: "$2a$10$qccZ2L8csoUcHQR1mMFkJulToLLZTe7Xo7DnM19dV4Ly3r1OkBg6S",
			verificationToken: "544f818f5f5cd4cde44c611683fc71",
			verifiedEmail: true
		});

		await TaskModel.create({
			id: "ll98bc1b-22f4-4fc6-be64-3d830068bdaa",
			userId: "ll98bc1b-22f4-4fc6-be64-3d830068bddc",
			taskName: "Lavar o carro",
		});
	}

	async deleteTestTaskAndUser(){
		await TaskModel.destroy({
			where: {}
		});

		await UserModel.destroy({
			where: {}
		});
	}
}

module.exports = {
	TaskRepository,
	TaskTestRepository
};