const UserModel = require("../../../database/models/User");
const TaskModel = require("../../../database/models/Task");

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
	TaskTestRepository
};