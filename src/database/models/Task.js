const { Model, Sequelize } = require("sequelize");

const sequelize = require("../sequelize/index");

class Task extends Model {}

Task.init({
	userId: Sequelize.STRING,
	taskName: Sequelize.STRING,
	date: Sequelize.DATEONLY,
	status: Sequelize.BOOLEAN,
},{sequelize});

module.exports = Task;