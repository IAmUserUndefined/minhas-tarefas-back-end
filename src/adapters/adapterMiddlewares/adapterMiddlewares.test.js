/* eslint-disable no-undef */

const { UnauthorizedError } = require("../../utils/errors/index");

const request = require("supertest");

const express = require("express");

const { Router, json } = require("express");

const adapterRouters = require("../adapterRouters/adapterRouters");

const adapterMiddlewares = require("./adapterMiddlewares");

const { ok } = require("../adapterResponses");

describe("Adapter routers middlewares", () => {

	test("Should return a unauthorized error", async () => {

		const router = Router();

		const testRouter = router.get("/", 
			adapterMiddlewares(async (request) => {
				const { authorization } = request.headers;
				
				if(!authorization)
					return new UnauthorizedError("Token Inválido");
			}),
			adapterRouters((request) => {
				const userId = request.userId;
				return ok(userId);
			}));		

		const app = express();

		app.use(testRouter);

		const response = await request(app)
			.get("/");

		expect(response.body.response).toBe("Token Inválido");
		expect(response.status).toBe(401);
	});

	test("Should return the user id", async () => {

		const router = Router();

		const testRouter = router.get("/", 
			adapterMiddlewares(async (request) => {
				const { authorization } = request.headers;

				const [, token] = authorization.split(" ");

				return token;
			}),
			adapterRouters((request) => {
				const userId = request.userId;
				return ok(userId);
			}));		

		const app = express();

		app.use(json());
		app.use(testRouter);

		const response = await request(app)
			.get("/")
			.set("Authorization", "Bearer userId");

		expect(response.body.response).toBe("userId");
		expect(response.status).toBe(200);
	});

});