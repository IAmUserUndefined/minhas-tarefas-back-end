/* eslint-disable no-undef */

jest.setTimeout(15000);

const { TaskTestRepository } = require("../../../repositories/Task");

const taskTestRepository = new TaskTestRepository();

const request = require("supertest");

const app = require("../../../app");

describe("Get tasks", () => {

	beforeAll(async () => {
		await taskTestRepository.createTestTaskAndUser();
	});

	afterAll(async () => {
		await taskTestRepository.deleteTestTaskAndUser();
	});

	test("Should get task", async () => {

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: "Corinthians1910"
			});

		const response = await request(app)
			.get("/task")
			.set("Authorization", `Bearer ${token.body.response}`);

		expect(response.statusCode).toBe(200);
		expect(response.body.response[0].id).not.toBeUndefined();
		expect(response.body.response[0].taskName).not.toBeUndefined();
		expect(response.body.response[0].status).not.toBeUndefined();
	});
});