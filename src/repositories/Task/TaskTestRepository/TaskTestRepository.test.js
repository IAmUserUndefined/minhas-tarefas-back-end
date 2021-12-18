/* eslint-disable no-undef */

const { TaskTestRepository } = require("./TaskTestRepository");

describe(("Test of task repository"), () => {

	test("Should create test task", async () => {
		const repository = new TaskTestRepository();
		await repository.createTestTaskAndUser();
	});

	test("Should remove test task", async () => {
		const repository = new TaskTestRepository();
		await repository.deleteTestTaskAndUser();
	});

});