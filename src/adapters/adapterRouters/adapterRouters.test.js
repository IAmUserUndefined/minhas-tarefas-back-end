/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */

jest.setTimeout(15000);

const { MissingParamError, InvalidParamError } = require("../../utils/errors/index");

const request = require("supertest");

const express = require("express");

const { Router, json } = require("express");

const adapterRouters = require("./adapterRouters");

const { ok } = require("../adapterResponses");

describe("Adapter routers test", () => {

	test("Should return Response with status code 200", async () => {

		const router = Router();

		const testRouter = router.get("/", adapterRouters((request) => {
			return ok("Response");
		}));		

		const app = express();

		app.use(testRouter);

		const response = await request(app)
			.get("/");

		expect(response.body.response).toBe("Response");
		expect(response.status).toBe(200);
	});

	test("Should return the body with the attribute email and the status code 200", async () => {

		const router = Router();

		const testRouter = router.post("/", adapterRouters((request) => {
			const { email } = request.body;
			return ok(email);
		}));

		const app = express();

		app.use(json());
		app.use(testRouter);

		const response = await request(app)
			.post("/")
			.send({
				email: "email@teste.com"
			});

		expect(response.body.response).toBe("email@teste.com");
	});

	test("Should return the query with the attribute email with status code 200", async () => {

		const router = Router();

		const testRouter = router.post("/", adapterRouters((request) => {
			const { email } = request.query;
			return ok(email);
		}));

		const app = express();

		app.use(json());
		app.use(testRouter);

		const response = await request(app)
			.post("/?email=email@teste.com");

		expect(response.body.response).toBe("email@teste.com");

	});

	test("Should return the params with the id attribute with status code 200", async () => {

		const router = Router();

		const testRouter = router.post("/:id", adapterRouters((request) => {
			const { id } = request.params;
			return ok(id);
		}));

		const app = express();

		app.use(json());
		app.use(testRouter);

		const response = await request(app)
			.post("/123-456-789");

		expect(response.body.response).toBe("123-456-789");

	});

	test("Should return the missing param error with the status code 400", async () => {
		
		const router = Router();

		const testRouter = router.get("/", adapterRouters((request) => {
			return ok(new MissingParamError("Preencha todos os campos"));
		}));		

		const app = express();

		app.use(testRouter);

		const response = await request(app)
			.get("/");

		expect(response.body.response).toBe("Preencha todos os campos");
		expect(response.status).toBe(400);
	});

	test("Should return a invalid param error with the status code 400", async () => {
		
		const router = Router();

		const testRouter = router.get("/", adapterRouters((request) => {
			return ok(new InvalidParamError("Preencha um email válido"));
		}));		

		const app = express();

		app.use(testRouter);

		const response = await request(app)
			.get("/");

		expect(response.body.response).toBe("Preencha um email válido");
		expect(response.status).toBe(400);
	});
});