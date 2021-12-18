/* eslint-disable no-undef */

const { UserRepository } = require("../../User/UserRepository/UserRepository");
const { TaskRepository } = require("./TaskRepository");

describe(("Test of task repository"), () => {

	beforeAll(async () => {
		const repository = new UserRepository();
		await repository.create("1", "email@teste.com", "Teste123", "abc-123-456");
	});

	afterAll(async () => {
		const repository = new UserRepository();
		await repository.delete("1");
	});

	test("Should create task", async () => {
		const repository = new TaskRepository();
		await repository.create("1", "1", "Estudar");
	});

	test("Should get task", async () => {
		const repository = new TaskRepository();
		const tasks = await repository.getTasks("1", "1");
		expect(tasks[0].id).toBe("1");
		expect(tasks[0].status).toBe(null);
		expect(tasks[0].taskName).toBe("Estudar");
	});

	test("Should finish task", async () => {
		const repository = new TaskRepository();
		await repository.finishTask("1", "1");
	});

	test("Should remove task", async () => {
		const repository = new TaskRepository();
		await repository.delete("1", "1");
	});
});