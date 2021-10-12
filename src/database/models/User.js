const { Model, Sequelize } = require("sequelize");

const sequelize = require("../sequelize/index");

const Task = require("./Task");

class User extends Model {}

User.init({
	email: Sequelize.STRING,
	password: Sequelize.STRING,
	verificationToken: Sequelize.STRING,
	verificationTokenExpiryDate: Sequelize.BIGINT,
	verifiedEmail: Sequelize.BOOLEAN
},{sequelize});

User.hasMany(Task);

module.exports = User;