const { Router } = require("express");

const authenticateUser = require("../middlewares/authenticateUser");

const adaptMiddlewares = require("../adapters/adapterMiddlewares/adapterMiddlewares");
const adaptRouters = require("../adapters/adapterRouters/adapterRouters");

const CreateTaskController = require("../useCases/Task/CreateTask/CreateTaskController");
const GetTasksController = require("../useCases/Task/GetTasks/GetTasksController");
const DeleteTaskController = require("../useCases/Task/DeleteTask/DeleteTaskController");
const FinishTaskController = require("../useCases/Task/FinishTask/FinishTaskController");

const router = Router();

router.post("/task", adaptMiddlewares(authenticateUser), adaptRouters(CreateTaskController.handle));
router.get("/task", adaptMiddlewares(authenticateUser), adaptRouters(GetTasksController.handle));
router.delete("/task/:id", adaptMiddlewares(authenticateUser), adaptRouters(DeleteTaskController.handle));
router.patch("/task/:id", adaptMiddlewares(authenticateUser), adaptRouters(FinishTaskController.handle));

module.exports = router;