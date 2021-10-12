/* eslint-disable no-undef */

jest.setTimeout(15000);

const { TaskTestRepository } = require("../../../repositories/Task");

const taskTestRepository = new TaskTestRepository();

const request = require("supertest");

const app = require("../../../app");

describe("Finish task", () => {

	beforeAll(async () => {
		await taskTestRepository.createTestTaskAndUser();
	});

	afterAll(async () => {
		await taskTestRepository.deleteTestTaskAndUser();
	});


	test("Should finish task", async () => {

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "joao@teste.com",
				password: "Corinthians1910"
			});

		const response = await request(app)
			.patch("/task/ll98bc1b-22f4-4fc6-be64-3d830068bdaa")
			.set("Authorization", `Bearer ${token.body.response}`);

		expect(response.statusCode).toBe(200);
	});
});