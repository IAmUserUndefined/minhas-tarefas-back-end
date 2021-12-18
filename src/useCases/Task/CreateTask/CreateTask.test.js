/* eslint-disable no-undef */

jest.setTimeout(15000);

require("dotenv/config");

const { TaskTestRepository } = require("../../../repositories/Task/TaskTestRepository/TaskTestRepository");

const taskTestRepository = new TaskTestRepository();

const request = require("supertest");

const app = require("../../../app");

describe("Create task", () => {

	beforeAll(async () => {
		await taskTestRepository.createTestTaskAndUser();
	});

	afterAll(async () => {
		await taskTestRepository.deleteTestTaskAndUser();
	});

	test("Should not create task, because expense assignment name field is empty", async () => {

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: "Corinthians1910"
			});

		const response = await request(app)
			.post("/task")
			.set("Authorization", `Bearer ${token.body.response}`)
			.send({
				taskName: "",
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.response).toBe("Preencha o nome da tarefa");
	});

	test("Should create task", async () => {

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: "Corinthians1910"
			});

		const response = await request(app)
			.post("/task")
			.set("Authorization", `Bearer ${token.body.response}`)
			.send({
				taskName: "Lavar o carro"
			});

		expect(response.statusCode).toBe(200);
	});
});