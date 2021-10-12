const { Router } = require("express");

const userRouters = require("./userRouters");
const taskRouters = require("./taskRouters");

const router = Router();

router.use(userRouters);
router.use(taskRouters);

module.exports = router;