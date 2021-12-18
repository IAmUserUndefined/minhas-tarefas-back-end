const { Router } = require("express");

const userRouters = require("./userRouters");
const taskRouters = require("./taskRouters");
const testRouter = require("./testRouter");

const router = Router();

router.use(userRouters);
router.use(taskRouters);
router.use(testRouter);

module.exports = router;